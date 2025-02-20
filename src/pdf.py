from fpdf import FPDF

from functions import format_field, test_blank, test_none, get_main_occupant, get_other_occupants, get_additional_info, \
      get_other_occupants, get_emergency_contact, get_vehicle_lines, get_rental_info, get_notes
from functions import NONE_STRING, YES_STRING, HAS_KEY_STRING, NO_STRING, BLANK_STRING

from datetime import datetime

"""
    https://pyfpdf.readthedocs.io/en/latest/index.html
"""

FONT_SIZE = 10
SECTION_SPACING = 8
TITLE_SPACING = 3
CARD_SPACING = 4

class PDF(FPDF):
    def __init__(self, title):
        super().__init__() # this invokes the super constructor with default values (portrait, millimeter, size A4): FPDF('P', 'mm', 'A4')
        self.title = title

    """    
    def header(self):
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Calculate width of title and position
        w = self.get_string_width(self.title) + 6
        self.set_x((210 - w) / 2)
        # Colors of frame, background and text
        self.set_draw_color(0, 80, 180)
        self.set_fill_color(88, 146, 220)
        self.set_text_color(255, 255, 255)
        # Thickness of frame (1 mm)
        self.set_line_width(0.25)
        # Title
        self.cell(w, 9, self.title, 1, 1, 'C', 1)
        # Line break
        self.ln(10) 

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 6)
        # Text color in gray
        self.set_text_color(128)
        # Page number
        #self.cell(0, 10, 'Page ' + str(self.page_no()), 0, 0, 'C')
        self.cell(0, 10, str('12-Dec-2023'), 0, 0, 'C')
    """

    def print_unit_header(self, label):
        # Arial 16
        self.set_font('Arial', 'B', 16)
        # Background color
        self.set_fill_color(200, 220, 255)
        # Title
        self.cell(160, 6, label, 0, 0, 'L', True)
        # print date at the far right
        self.set_font('Arial', '', 7)
        self.set_text_color(140, 140, 140)
        date = datetime.today().strftime('%d-%b-%Y')
        self.cell(0, 6, date, 0, 1, 'R', True)
        self.set_text_color(0, 0, 0)

    def print_residents(self, users):
        for i in range(0, len(users), 2):
            # this logic below is to correctly produce PDF even for an ODD number of residents
            if i < len(users) - 2:
                user1 = users[i]
                user2 = users[i+1]
            elif len(users) % 2 == 0:
                user1 = users[i]
                user2 = users[i+1]
            else:
                user1 = users[i]
                user2 = None
            self.print_one_page(user1, user2)

    def print_lines(self, lines, spacing):
        first = True
        for line in lines:
            if len(line.strip()) == 0:
                continue
            if not first:
                self.ln()
            self.cell(0, spacing, line)
            first = False

    def print_resident(self, resident):
        self.print_unit_header(f"Unit: {resident.unit}")

        self.ln(2)
        self.set_font('Courier', 'B', FONT_SIZE)
        self.cell(0, TITLE_SPACING, 'Main Occupant:')
        self.ln()
        self.set_font('Courier', '', FONT_SIZE)
        self.print_lines(get_main_occupant(resident), 4)

        # other occupants
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        lines = get_other_occupants(resident)
        if lines[0] == NONE_STRING:
            self.cell(0, 5, 'Other Occupants: ' + NONE_STRING)
        else:
            self.cell(0, TITLE_SPACING, 'Other Occupants:')
            self.ln()
            self.set_font('Courier', '', FONT_SIZE)
            self.print_lines(lines, 4)

        # emergency contact
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        if get_emergency_contact(resident) == NONE_STRING:
            self.cell(0, 5, 'Emergency Contact: ' + NONE_STRING)
        else:
            self.cell(0, TITLE_SPACING, 'Emergency Contact:')
            self.ln()
            self.set_font('Courier', '', FONT_SIZE)
            self.cell(0, 5, get_emergency_contact(resident))

        # rental info
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        self.cell(0, 5, 'Rental Info:')
        self.ln()
        self.set_font('Courier', '', FONT_SIZE)
        self.print_lines(get_rental_info(resident), 4)

        # additional info
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        self.cell(0, TITLE_SPACING, 'Additional Info:')
        self.ln()
        self.set_font('Courier', '', FONT_SIZE)
        self.print_lines(get_additional_info(resident), 4)

        # vehicles
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        self.cell(0, TITLE_SPACING, 'Vehicles:')
        self.ln()
        self.set_font('Courier', '', FONT_SIZE)
        self.print_lines(get_vehicle_lines(resident), 4)

        # notes
        self.ln(SECTION_SPACING)
        self.set_font('Courier', 'B', FONT_SIZE)
        lines = get_notes(resident)
        if lines[0] == NONE_STRING:
            self.cell(0, 5, 'Notes: ' + NONE_STRING)
        else:
            self.cell(0, TITLE_SPACING, 'Notes:')
            self.ln()
            self.set_font('Courier', '', FONT_SIZE)
            self.print_lines(get_notes(resident), 4)


    def print_one_page(self, resident1, resident2):
        self.add_page()

        # print first half of page
        self.print_resident(resident1)

        # calc the space to print between top and bottom cards
        page_height = 144
        space_diff = 0
        if self.get_y() < page_height:
           space_diff = int(page_height - self.get_y())
        space_diff += CARD_SPACING
        self.ln(space_diff)

        if resident2 is None:
            return

        # print second half of page
        self.print_resident(resident2)
