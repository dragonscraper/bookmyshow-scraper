import base64
import logging
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

logger  =  logging.getLogger('HELPER')

DECRYPT_KEY : str = 'kYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z'

def decrypter(encrypted_text, key : str = DECRYPT_KEY):
        
        try:
            encrypted_bytes = base64.b64decode(encrypted_text)
            key_bytes = key.encode('utf-8')
            key_bytes = key_bytes.ljust(32, b'\0')[:32]  
            iv = bytes(16)
            cipher = AES.new(key_bytes, AES.MODE_CBC, iv)
            decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
            return decrypted_bytes.decode('utf-8')
        except Exception as e:
            logger.critical(f"Error decryptiong {encrypted_text}: {e}")

def seats_parser( input_str : str):
    parts = input_str.split('||')
    if len(parts) != 2:
        return
    
    areas_part, rows_part = parts
    aAreas = [area.split(':') for area in areas_part.split('|') if area]
    aRows = [row.split(':') for row in rows_part.split('|') if row]
    
    categories = {ar[1] :{'name':ar[0],'sold':0,'total':0}  for ar in aAreas }
    
    total_seats = 0
    total_sold_seats = 0
    screen_data_arr = []
    
    
    for row in aRows:
        if len(row) < 3:  # Skip invalid rows
            continue
        
        row_label = row[1]
        seats_info = []
        row_total_seats = 0
        row_sold_seats = 0
        
        
        
        for seat in row[2:]:
            row_details = seat.split('+')
            seat_code = row_details[0]

            # Extract status and seat number
            seat_type = seat_code[0]
            seat_status = seat_code[1] if len(seat_code) > 1 else None
            seat_number = None

            if len(row_details) > 1:
                # If '+' exists, use the second part as the seat number
                seat_number = row_details[1]
            else:
                # If '+' does not exist, use the substring after the second character
                seat_number = seat_code[2:] if len(seat_code) > 2 else None
            
            if not seat_number  or seat_number in  {'0','00'}: continue
            
            total_seats += 1
            row_total_seats += 1
            
            categories[seat_type]['total'] += 1
            
            is_sold = seat_status in {"2", "3", "9"}
            if is_sold:
                total_sold_seats += 1
                row_sold_seats += 1
                categories[seat_type]['sold'] += 1

            seats_info.append({
                'seat': seat_number,
                'status': seat_status,
                'is_sold': is_sold,
                'type':seat_type
            })


        screen_data_arr.append({
            'row_label': row_label,
            'total_seats': row_total_seats,
            'sold_seats': row_sold_seats,
            'seats_info': seats_info
        })

    return {
        'seats': total_seats,
        'sold': total_sold_seats,
        'categories': { v['name']:{'name':k , **{j:i  for j,i in v.items() if j !='name'}}  for k,v in categories.items()}, 
        'row_data': screen_data_arr
    }

def setup_logger(level):
    logger = logging.getLogger("SCRAPER")
    logger.setLevel(level)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(level) 
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(funcName)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(formatter)
    if not logger.handlers: 
        logger.addHandler(console_handler)
    return logger


if __name__ == "__main__":
    d = 'VIP:A:0000000003:3:N:0|EXECUTIVE:B:0000000002:2:N:0|NORMAL:C:0000000000:1:N:0||1:M:A101+11:A102+10:A000+00:A104+09:A405+08:A000+00:A207+07:A208+06:A000+00:A210+05:A111+04:A000+00:A113+03:A114+02:A000+00:A116+01:A000+00|2:-:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00:B000+00|3:L:B000+00:B102+15:B103+14:B104+13:B000+00:B206+12:B207+11:B208+10:B409+09:B410+08:B411+07:B412+06:B113+05:B214+04:B215+03:B216+02:B217+01|4:K:B000+00:B102+15:B103+14:B104+13:B000+00:B206+12:B207+11:B208+10:B209+09:B210+08:B411+07:B412+06:B113+05:B114+04:B115+03:B116+02:B117+01|5:J:B000+00:B102+15:B103+14:B104+13:B000+00:B206+12:B207+11:B208+10:B209+09:B210+08:B411+07:B412+06:B113+05:B114+04:B115+03:B116+02:B117+01|6:I:B000+00:B102+15:B103+14:B104+13:B000+00:B106+12:B107+11:B108+10:B109+09:B110+08:B111+07:B112+06:B113+05:B114+04:B115+03:B116+02:B117+01|7:H:B000+00:B102+15:B103+14:B104+13:B000+00:B106+12:B107+11:B108+10:B109+09:B110+08:B111+07:B112+06:B113+05:B114+04:B115+03:B116+02:B117+01|8:G:B000+00:B102+12:B103+11:B104+10:B000+00:B106+09:B107+08:B108+07:B109+06:B110+05:B111+04:B112+03:B113+02:B114+01:B000+00:B000+00:B000+00|9:-:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00|10:F:C401+11:C402+10:C403+09:C404+08:C000+00:C406+07:C407+06:C108+05:C409+04:C410+03:C411+02:C412+01:C000+00:C000+00:C000+00:C000+00:C000+00|11:E:C101+11:C102+10:C403+09:C104+08:C000+00:C406+07:C407+06:C108+05:C109+04:C110+03:C111+02:C112+01:C000+00:C000+00:C000+00:C000+00:C000+00|12:D:C101+11:C102+10:C103+09:C104+08:C000+00:C106+07:C107+06:C108+05:C109+04:C110+03:C111+02:C112+01:C000+00:C000+00:C000+00:C000+00:C000+00|13:C:C101+11:C102+10:C103+09:C104+08:C000+00:C106+07:C107+06:C108+05:C109+04:C110+03:C111+02:C112+01:C000+00:C000+00:C000+00:C000+00:C000+00|14:B:C101+11:C102+10:C103+09:C104+08:C000+00:C106+07:C107+06:C108+05:C109+04:C110+03:C111+02:C112+01:C000+00:C000+00:C000+00:C000+00:C000+00|15:A:C000+00:C000+00:C000+00:C104+07:C000+00:C106+06:C107+05:C108+04:C109+03:C110+02:C111+01:C000+00:C000+00:C000+00:C000+00:C000+00:C000+00|'
    print(seats_parser(d))