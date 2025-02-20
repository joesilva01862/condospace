
YES_STRING = 'Yes'
NO_STRING = 'No'
NONE_STRING = '[NONE]'
BLANK_STRING = '[BLANK]'
HAS_KEY_STRING = "has key"
NO_KEY_STRING = ''

def format_field(field, desired_len):
    rfield = field
    if len(rfield) < desired_len:
        diff = desired_len - len(rfield)
        for i in range(diff):
            rfield += ' '
    return rfield

def test_none(lines):
    for line in lines:
        if len(line.strip()) != 0:
            return lines
    return [NONE_STRING]

def test_blank(lines):
    for line in lines:
        if len(line.strip()) != 0:
            return lines
    return [BLANK_STRING]

def get_main_occupant(resident):
    name = format_field(resident.name, 28)
    email = format_field(resident.email, 30)
    phone = format_field(resident.phone, 12)
    last_update_date = resident.last_update_date if resident.last_update_date else '[BLANK]'
    since = str(resident.startdt['month']) + '/' + str(resident.startdt['year']) if resident.startdt['month'] and resident.startdt['year'] else '[BLANK]'
    return [f"{name}  {email}  {phone}", f"Resident since: {since}    Last update by resident: {last_update_date}"]

def get_other_occupants(resident):
    name0 = format_field(resident.occupants[0]['name'], 30)
    name1 = format_field(resident.occupants[1]['name'], 30)
    name2 = format_field(resident.occupants[2]['name'], 30)
    name3 = format_field(resident.occupants[3]['name'], 30)
    name4 = format_field(resident.occupants[4]['name'], 30)
    email0 = format_field(resident.occupants[0]['email'], 30)
    email1 = format_field(resident.occupants[1]['email'], 30)
    email2 = format_field(resident.occupants[2]['email'], 30)
    email3 = format_field(resident.occupants[3]['email'], 30)
    email4 = format_field(resident.occupants[4]['email'], 30)
    phone0 = format_field(resident.occupants[0]['phone'], 15)
    phone1 = format_field(resident.occupants[1]['phone'], 15)
    phone2 = format_field(resident.occupants[2]['phone'], 15)
    phone3 = format_field(resident.occupants[3]['phone'], 15)
    phone4 = format_field(resident.occupants[4]['phone'], 15)
    has_key0 = HAS_KEY_STRING if resident.occupants[0]['has_key'] else NO_KEY_STRING
    has_key1 = HAS_KEY_STRING if resident.occupants[1]['has_key'] else NO_KEY_STRING
    has_key2 = HAS_KEY_STRING if resident.occupants[2]['has_key'] else NO_KEY_STRING
    has_key3 = HAS_KEY_STRING if resident.occupants[3]['has_key'] else NO_KEY_STRING
    has_key4 = HAS_KEY_STRING if resident.occupants[4]['has_key'] else NO_KEY_STRING
    lines = [f"{name0}  {email0}  {phone0}  {has_key0}",
             f"{name1}  {email1}  {phone1}  {has_key1}",
             f"{name2}  {email2}  {phone2}  {has_key2}",
             f"{name3}  {email3}  {phone3}  {has_key3}",
             f"{name4}  {email4}  {phone4}  {has_key4}"]
    return test_none(lines)

def get_emergency_contact(resident):
    name = format_field(resident.emerg_name, 30)
    email = format_field(resident.emerg_email, 30)
    phone = format_field(resident.emerg_phone, 15)
    has_key = HAS_KEY_STRING if resident.emerg_has_key else NO_KEY_STRING
    line = f"{name}  {email}  {phone}  {has_key}"
    line = test_none([line])
    return line[0]


def get_rental_info(resident):
    if resident.isrental:
        line1 = f"Owner name: {resident.ownername}, email {resident.owneremail}, phone {resident.ownerphone}"
        line2 = f"Address: {resident.owneraddress}" if resident.owneraddress else 'Address: [BLANK]'
        lines = [line1, line2]
    else:
        line1 = "This unit is not a rental."
        lines =[line1]
    return lines

def get_vehicle_lines(resident):
    if resident.no_vehicles:
        return ["Reports having no vehicles"]

    make0 = format_field(resident.vehicles[0]['make_model'], 20)
    make1 = format_field(resident.vehicles[1]['make_model'], 20)
    plate0 = format_field(resident.vehicles[0]['plate'], 15)
    plate1 = format_field(resident.vehicles[1]['plate'], 15)
    color0 = format_field(resident.vehicles[0]['color'], 15)
    color1 = format_field(resident.vehicles[1]['color'], 15)
    year0 = resident.vehicles[0]['year'] if resident.vehicles[0]['year'] else ''
    year1 = resident.vehicles[1]['year'] if resident.vehicles[1]['year'] else ''
    lines = [f"{make0}  {plate0}  {color0}  {year0}",
             f"{make1}  {plate1}  {color1}  {year1}"]
    return test_blank(lines)


def get_additional_info(user):
    oxygen_equipment = YES_STRING if user.oxygen_equipment else NO_STRING
    limited_mobility = YES_STRING if user.limited_mobility else NO_STRING
    routine_visits = YES_STRING if user.routine_visits else NO_STRING
    has_pet = YES_STRING if user.has_pet else NO_STRING
    bike_count = str(user.bike_count) if user.bike_count else '[BLANK]'
    insurance_carrier = user.insurance_carrier if user.insurance_carrier else '[BLANK]'
    if user.valve_type == 1:
        valve_type = 'Knob'
    elif user.valve_type == 2:
        valve_type = 'Lever'
    else:
        valve_type = "Don't know"
    oxygen_equipment = format_field('User oxygen equipment: ' + oxygen_equipment, 40)
    limited_mobility = format_field('Has limited mobility: ' + limited_mobility, 40)
    routine_visits = format_field('Assistance services routine visits: ' + routine_visits, 40)
    has_pet = format_field('Has pets: ' + has_pet, 40)
    bike_count = format_field('Number of bicycles in garage: ' + bike_count, 40)
    insurance_carrier = format_field('Insurance carrier: ' + insurance_carrier, 40)
    valve_type = format_field('Main water shut off type: ' + valve_type, 40)
    return [f"{oxygen_equipment}  {limited_mobility}", f"{routine_visits}  {has_pet}", f"{bike_count}  {insurance_carrier}", f"{valve_type}"]

def get_notes(user):
    notes = user.notes.split('\n')
    return test_none(notes)


