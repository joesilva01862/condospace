
import json
from flask import Flask, request, session, abort, redirect, Response, url_for, render_template, send_from_directory, flash
from users import users_repository
from users import User
from datetime import timedelta, datetime
from fpdf import FPDF, HTMLMixin
from pdf import PDF

app = Flask(
            __name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates'
           )

SERVER_FOLDER = 'serverfiles'
RESIDENTS_DB = SERVER_FOLDER + "/" + "residents.json"

# read residents json file and create dictionaries
with open(RESIDENTS_DB, 'r') as f:
    strContent = f.read()
    jsonObj = json.loads(strContent)
    residents = jsonObj['residents']
    for resident in residents:
        user = User(
            users_repository.next_index(),
            resident['unit'],
            resident['userid'],
            resident['password'],
            resident['name'],
            resident['email'],
            resident['startdt'],
            resident['phone'],
            resident['type'],
            resident['ownername'],
            resident['owneremail'],
            resident['ownerphone'],
            resident['owneraddress'],
            resident['isrental'],
            resident['emerg_name'],
            resident['emerg_email'],
            resident['emerg_phone'],
            resident['emerg_has_key'],
            resident['occupants'],
            resident['oxygen_equipment'],
            resident['limited_mobility'],
            resident['routine_visits'],
            resident['has_pet'],
            resident['bike_count'],
            resident['insurance_carrier'],
            resident['valve_type'],
            resident['no_vehicles'],
            resident['vehicles'],
            resident['last_update_date'],
            resident['notes']
        )
        users_repository.add_user_to_dict(user)


@app.route('/')
def index():
    return "this is the home page"

@app.route('/hello')
def say_hello():
    return "saying hello back"

@app.route('/bye')
def say_bye():
    return "saying bye back"


def sort_criteria(user):
    return user.get_unit()

def gen_pdf():
    title = 'Whitegate Census Forms'
    pdf = PDF(title)
    pdf.set_title(title)
    pdf.set_author('Joe Silva')

    users = []
    for key in users_repository.get_users():
        user = users_repository.get_user_by_unit(key)
        if user.get_unit() == 0:
            continue
        else:
            users.append(user)

    # sort users list by unit number
    users.sort(key=sort_criteria)

    # create PDF content and output file
    pdf.print_residents(users)
    pdf.output('users.pdf', 'F')


@app.route('/genanotherpdf')
def gen_another_pdf():
    # instantiating the class
    pdf = MyFPDF()

    # adding a page
    pdf.add_page()

    # opening html file
    file = open("../templates/login.html", "r")

    # extracting the data from the file as a string
    data = file.read()

    # HTMLMixin write_html method
    pdf.write_html(data)

    # list users
    users = users_repository.get_users()
    print("these are my users:")
    print(users)

    #saving the file as a pdf
    pdf.output('users.pdf', 'F')


# creating a class to inherit from both FPDF and HTMLMixin
class MyFPDF(FPDF, HTMLMixin):
    pass


# host='0.0.0.0' means "accept connections from any client ip address"
if __name__ == '__main__':
    gen_pdf()




