

from scraper import BookMyShow
from helpers import setup_logger

logger  = setup_logger("INFO")

scraper = BookMyShow()


def get_movie_info(movie_url):
    movie_info = scraper.get_movie_info(movie_url)
    return movie_info

def get_screens_dates(movie_ticket_url):
    screens_dates = scraper.get_screens_dates(movie_ticket_url)
    return screens_dates

def get_cinemas_screens(show_url):
    cinemas_screens = scraper.get_cinemas(show_url)
    return cinemas_screens

def get_seats_for_screen(venueCode, session_id):
    seats_data = scraper.get_seaets(venueCode, session_id)
    
    if seats_data.get('error'):
        if ("Bookings Closed for this Show" in seats_data.get('data')
            or 
            "Something's not right here" in seats_data.get('data')):
            logger.error(
                f"[{session_id}:{venueCode}] > {seats_data.get('data')}"
            )
        return 
    return seats_data.get('data')


print(get_movie_info("https://in.bookmyshow.com/movies/mumbai/daadi-ki-shaadi/ET00495169"))

print(get_screens_dates("https://in.bookmyshow.com/movies/mumbai/daadi-ki-shaadi/buytickets/ET00495169/20260509"))

screens = get_cinemas_screens("https://in.bookmyshow.com/movies/mumbai/daadi-ki-shaadi/buytickets/ET00495169/20260509")
for screen in screens:
    print(screen)
    if screen.get('sessionId') and screen.get('venueCode'):
        seats = get_seats_for_screen(screen['venueCode'], screen['sessionId'])
        print(seats)