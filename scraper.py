import time
import json
import logging
from pathlib import Path
from functools import reduce
from datetime import datetime
from bs4 import BeautifulSoup
from curl_cffi.requests import Session

from helpers import seats_parser, decrypter


logger  =  logging.getLogger('SCRAPER')


BASE_DIR =  Path(__file__).resolve().parent



HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Referer': 'https://in.bookmyshow.com/',
    'DNT': '1',
    'Sec-GPC': '1',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',

}


class Scraper:
    def __init__(self):
        self.session = Session()
        self.max_retries = 3
        self.requests_per_minute = 25
        self.request_timestamps = []
        self.rate_limied_urls = set("https://services-in.bookmyshow.com/doTrans.aspx",)
      
    def wait_if_needed(self, url):
        current_time = time.time()
        if not url in self.rate_limied_urls : return
        
        one_minute_ago = current_time - 60
        self.request_timestamps = [ts for ts in self.request_timestamps if ts > one_minute_ago]
        
        if len(self.request_timestamps) >= self.requests_per_minute:
            oldest_timestamp = min(self.request_timestamps)
            wait_time = max(0, (oldest_timestamp + 60) - current_time)
            
            if wait_time > 0:
                logger.warning(f"Rate limit reached, waiting {wait_time:.2f} seconds...")
                self.sleep(wait_time)
                
        self.request_timestamps.append(current_time)
        logger.info(f"Request #{len(self.request_timestamps)} in the last minute")
      
        
    def sleep(self, t : int =  10):
        logger.info(f"sleeping {t} seconds")
        time.sleep(t)
        

    def do_Req(self,method, **kwargs  ):
        for retry in range(1, self.max_retries + 1):
            try:
                self.wait_if_needed(kwargs['url'])
                        
                res =  method(**kwargs)
                status = res.status_code
                
                if kwargs['url'] == "https://services-in.bookmyshow.com/doTrans.aspx":
                    self.request_timestamps.append(time.time())
                    
                if status == 200: return res
                else:
                    logger.error(f'{kwargs['url']} blocked => {status}')
            except Exception as e:
                logger.critical(
                    f'making {method}:{kwargs} raised exception {e}'
                )


    def fetch(self,
              method : str, url : str,
              json : bool = False,
              headers = {}, 
              params : dict = {},
              data : dict = {}
              ):

        method =  getattr(self.session,method)
        
        kwargs  = {
            "url":url, 
            "params":params, 
            "data":data,
            "impersonate":"chrome",
            "headers":headers or HEADERS,
            "verify":False,
            "timeout":100
        }
        
        res  =  self.do_Req( method=method, **kwargs)
        if not res:
            logger.error(
                f"no response for {kwargs}"
            )
            return
        return res.json() if json else BeautifulSoup(res.content, "html.parser")
    
    def close(self):
        self.session.close()
    
    def loads(self, data : str):
        return json.loads(data)        
            

    def json_path(self, data, keys :  list, default = None, render : bool = False):
        try:
            output =  reduce(lambda d, key: d[key], keys, data) 
            if render:
                return self.html_str(output)
            return output
    
        except : return default
        
class BookMyShow(Scraper):
    def __init__(self):
        super().__init__()
        
        self.base_url = "https://in.bookmyshow.com"
        self.movie_url = "https://in.bookmyshow.com/wardha/movies/{name}/{uid}"
        self.ticket_url = "https://in.bookmyshow.com/buytickets/{name}-wardha/movie-ward-{uid}-MT/"
        self.screens_url = "https://in.bookmyshow.com/seatlayout?cid={code}&sid={sid}&routeCheck=1&sl=Y&newShowtime=1#!seatlayout"    
        self.seats_url = "https://services-in.bookmyshow.com/doTrans.aspx"

    def get_seaets(self,venueCode : str,  sid : int):
        payload = {
            'strCommand':'GETSEATLAYOUT',
            'strAppCode':'WEB',
            'strVenueCode':venueCode,
            'lngTransactionIdentifier':0,
            'strParam1':sid,
            'strParam2':'WEB',
            'strParam3':'',
            'strParam4':'',
            'strParam5':'Y',
            'strParam6':'',
            'strParam7':'',
            'strParam8':'',
            'strParam9':'',
            'strParam10':'',
            'strFormat':'json'
            
        }
        
        data  =  self.fetch(method='post',url=self.seats_url,data=payload,  json=True)
        if not data: return {"error":True,"data":"no Reponse"}
        
        blnSuccess = data['BookMyShow']['blnSuccess']
        if  blnSuccess  in ['false',False]: 
            logger.warning(
                f"Not blnSuccess {data['BookMyShow']['strException']}"
            )
            return {"error":True,"data":data['BookMyShow']['strException']}
        
        strData  =  data['BookMyShow']['strData']
        decrypted  =  decrypter(encrypted_text = strData)
        
        if not decrypted :
            logger.error(
                f"could not decrypt {venueCode}:{sid}"
            )
            return {"error":True,"data": f"could not decrypt {venueCode}:{sid}"}
        
        return {"error":False,"data": seats_parser(decrypted)}

    def get_screens_dates(self, url :  str):
        page  =  self.fetch( method='get',url=url)
        script =  page.select_one("script:-soup-contains('window.__INITIAL_STATE__')")
        if not script: 
            logger.error(
                f"No Script {url}"
            )
            return
        data_script  =  script.get_text(strip=True).replace('window.__INITIAL_STATE__ =',"") 
        showDates =  self.json_path(self.loads(data_script),keys=['showtimesByEvent','showDates'], default={})
        showdate =  list(showDates.keys())[0]
        topStickyWidgets =  self.json_path(showDates,keys=[showdate,'dynamic','data','topStickyWidgets'],default=[])
        
        dates = next(
        (widget['data'] for widget in topStickyWidgets if widget['type'] == "horizontal-block-list"),
                {}
            )
        
        arr_full = []
        for date in dates:
            if date["styleId"] == "date-disabled":
                continue
            date_code =  date['id']
            title = " ".join(item["text"] for item in date['data'])
            date_label =  self.json_path(date,keys=['cta','analytics','label'])
            date_obj = datetime.strptime(date_label, "%Y-%m-%d")
            arr_full.append({
                'date_code':date_code,
                'title':title,
                'date':date_obj})

        return arr_full
    
    
    def get_cinemas(self, url : str):
        page  =  self.fetch( method='get',url=url)
        script =  page.select_one("script:-soup-contains('window.__INITIAL_STATE__')")
        if not script: 
            logger.error(
                f"No Script {url}"
            )
            return
        data_script  =  script.get_text(strip=True).replace('window.__INITIAL_STATE__ =',"") 
        showDates =  self.json_path(self.loads(data_script),keys=['showtimesByEvent','showDates'], default={})
        showdate =  list(showDates.keys())[0]
        showtimeWidgets =  self.json_path(showDates,keys=[showdate,'dynamic','data','showtimeWidgets'],default=[])        
        
        cinemas = next(
                (widget['data'][0]['data'] for widget in showtimeWidgets if widget['type'] == 'groupList'),
                        []
                    )

        for cinema  in cinemas:
            venueCode =  self.json_path(cinema,keys=['additionalData','venueCode'])
            cinema_name  =  self.json_path(cinema,keys=['header','title','text'])
            showtimes  =  self.json_path(cinema,keys=['showtimes'],default=[])
            screens  = []
            for showtime in showtimes:
                session_id = showtime['additionalData']['sessionId']
                title = showtime['title']
                show_time_str =  showtime['additionalData']['showDateTime']
                show_time = datetime.strptime(show_time_str, "%Y%m%d%H%M")
                
                seats_data  = self.get_seaets(venueCode, session_id)
                
                screens.append({
                    'session_id':session_id, 
                    'title':title,
                    'show_time_str':show_time_str, 
                    'show_time':show_time,
                    'seats_data': seats_data
                })    
            yield {'cinema':cinema_name,'uid':venueCode,'screens':screens}   
        
        return True

    def cookies(self, data : dict):
        bmsId  =  data.get('rgn') or {}
        return {
            'name':bmsId.get('regionName'),
            'slug':bmsId.get('regionNameSlug'),
            'code':bmsId.get('regionCode')
            }

    def get_events(self, data  : dict):
        pages  = self.json_path(data,keys=['synopsisRender','bannerWidget','pageCta'])
        if not pages : return (None,None,None)
    
        book_page = next((page for page in pages if "Book tickets" in page.get('text')),None)
        pages = self.json_path(book_page, keys=['meta', 'options'], default=[]) if book_page else []
        
        events  = []
        for work in pages:
            events.append ({
                'language':work['language'],
                'events':[{'event_code': f['eventCode'], 'dimension': f['dimension'] } for f in work['formats']]
            })
            
        return (
                self.json_path(data,keys=['synopsis','eventDefaultCode']),
                events,
                self.json_path(data,keys=['synopsis','eventType'])
                )
    
    def get_movie_info(self, url : str):
        soup =  self.fetch(
            method='get', url=url
        )

        script =  soup.select_one("script:-soup-contains('window.__INITIAL_STATE__')")
        if not script: 
            logger.error(
                f"No Script {url}"
            )
            return
        data_script  =  script.get_text(strip=True).replace('window.__INITIAL_STATE__ =',"")
        dict_script =  self.loads(data_script)
        
        seo  = self.json_path(dict_script,keys=['seo'],default={})
        

        
        movie_slug   =  url.replace(self.base_url,"")

        title = self.json_path(seo,keys=["queries",movie_slug,'data','header','title'],default='').split('|')[0]
        cookies  =  self.cookies(self.json_path(dict_script,keys=['cookies'],default={}) )
        if not len(title) > 1 : return
        eventDefaultCode, events, eventType  = self.get_events(self.json_path(dict_script,keys=['synopsisStore']))
        return {
            'title': title,
            'cookies':cookies,
            'movie_slug':movie_slug,
            'eventDefaultCode':eventDefaultCode,
            'eventType':eventType,
            'events':events
        }
        
        
if __name__  == "__main__":
    app =  BookMyShow()