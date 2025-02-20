import stripe
from flask import Flask, Response, redirect, jsonify, url_for, send_from_directory, request, make_response, abort, render_template
import io
import json
import os
import random
from functools import cache
from PIL import Image
from threading import Thread
from random import randint

CONFIG_FOLDER = "config"
CONFIG_FILE =   f"{CONFIG_FOLDER}/config.json"


CREDENTIAL_PATH = "letras-d27d7-91f8adb767cd.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = CONFIG_FILE
BUCKET_NAME = 'letras-d27d7.appspot.com'

#DOMAIN = "youprettynow.com"
#DOMAIN = "prettyyounow.com"
PORT = 8002
DOMAIN = f"localhost:{PORT}"

COMPANY_NAME = "Stardom Media LLC"
COPYRIGHT = f"2024 Copyright {COMPANY_NAME}"
SITE_NAME = "Lyrics and More"

app = Flask(
            __name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates'
           )


stripe_keys = {
    "secret_key": 'sk_test_51QGo5vJLWnos7k5ezb9aDm5Xb1oL5lA1O9J3JDzDBIFacXOFQHx93lTfmseW1lZfFi6oWJLKO6bPCGXpOCezCEBW00Bsb011px',
    "publishable_key": 'pk_test_51QGo5vJLWnos7k5enz9pEs5g6DKROSUsfSc9wuLKcv7RmiAVsWhDVdSVDgCiIDP1FL3tFxltZb9em894YN8ZGfj5001baVYI2O',
    "endpoint_secret": 'whsec_ff5610d5b9c39f4965698c3ba000970249f7bc27b3b3b7e3e7ab58344cd4de34',
}

stripe.api_key = stripe_keys["secret_key"]
app.url_map.strict_slashes = False



'''
  host='0.0.0.0' means "accept connections from any client ip address".
  This is only used for testing purposes. In production, server.py is loaded by passenger_wsgi.py,
  which is where we load the users from disk into a dict since main() below will never run.
'''
def main():
    app.run(host='0.0.0.0', debug=False)

if __name__ == '__main__':
    main()
