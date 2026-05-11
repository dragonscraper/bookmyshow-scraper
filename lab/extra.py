

def seats_parser( input_str : str):
    parts = input_str.split('||')
    if len(parts) != 2:
        return
    
    areas_part, rows_part = parts
    aAreas = [area.split(':') for area in areas_part.split('|') if area]
    aRows = [row.split(':') for row in rows_part.split('|') if row]
    
    total_seats = 0
    total_sold_seats = 0
    total_categories = len(aAreas)
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
            
            is_sold = seat_status in {"2", "3", "9"}
            if is_sold:
                total_sold_seats += 1
                row_sold_seats += 1

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
        'categories': total_categories,
        'row_data': screen_data_arr
    }
        
    

# print(seats_parser("NORMAL:A:0000000000:1:N:0||1:I:A000:A0+0:A0+0:A1013+12:A4014+11:A4015+10:A4016+9:A0+0:A4018+8:A2019+7:A20110+6:A40111+5:A0+0:A40113+4:A40114+3:A40115+2:A10116+1|2:H:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A4018+8:A4019+7:A20110+6:A20111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|3:G:A000:A0+0:A0+0:A1013+12:A1014+11:A4015+10:A4016+9:A0+0:A4018+8:A4019+7:A40110+6:A40111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|4:F:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A4018+8:A4019+7:A40110+6:A40111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|5:E:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A1018+8:A4019+7:A40110+6:A10111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|6:D:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A1018+8:A4019+7:A10110+6:A10111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|7:C:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A1018+8:A1019+7:A10110+6:A10111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|8:B:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A1018+8:A1019+7:A10110+6:A10111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|9:A:A000:A0+0:A0+0:A1013+12:A1014+11:A1015+10:A1016+9:A0+0:A1018+8:A1019+7:A10110+6:A10111+5:A0+0:A10113+4:A10114+3:A10115+2:A10116+1|"))
print(seats_parser("PE:A:PE:1:N:0|CC:B:CC:2:N:0||J:J:A000:A000:A101:A102:A103:A104:A000:A205:A206:A207:A208:A000:A109:A110:A111:A112:A000|H:H:A000:A000:A101:A102:A103:A104:A000:A205:A206:A207:A108:A000:A109:A210:A211:A212:A000|G:G:B000:B000:B201:B202:B203:B204:B000:B205:B206:B207:B208:B000:B209:B210:B211:B212:B000|F:F:B000:B000:B101:B102:B403:B404:B000:B405:B206:B207:B408:B000:B209:B210:B211:B112:B000|E:E:B000:B000:B101:B102:B103:B104:B000:B405:B406:B407:B108:B000:B109:B110:B111:B112:B000|D:D:B000:B000:B101:B102:B103:B104:B000:B205:B206:B207:B208:B000:B109:B110:B111:B112:B000|C:C:B000:B000:B101:B102:B103:B104:B000:B105:B106:B107:B108:B000:B109:B110:B111:B112:B000|B:B:B000:B000:B101:B102:B103:B104:B000:B105:B106:B107:B108:B000:B109:B110:B111:B112:B000|A:A:B000:B000:B101:B102:B103:B104:B000:B105:B106:B107:B108:B000:B109:B110:B111:B112:B000|::B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000:B000|"))