
from threading import Thread, Lock
from time import sleep
import random
from flask import Flask, request, session, abort, redirect, Response, url_for, render_template, send_from_directory, flash, session
import json

# define the lock object
lock = Lock()

data_to_be_protected = [1, 2, 3, 4, 5]

app = Flask(
            __name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates'
           )


def run_with_lock(func):
    lock.acquire()
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    lock.release()
    return wrapper

#@run_with_lock

@run_with_lock
@app.route('/change_data', methods=['POST'])
def change_data():
    json_obj = request.get_json()
    array = json_obj['request']['array']
    for i in range(5):
        data_to_be_protected[i] = array[i]
    print(f"array: {array}, requestor: {json_obj['request']['name']}")
    return_obj = {'status': 'OK', 'array': data_to_be_protected}
    return json.dumps(return_obj)


@app.route('/get_data')
def get_data():
    lock.acquire()
    return_obj = {'array': data_to_be_protected}
    lock.release()
    return json.dumps(return_obj)


def main():
    app.run(host='0.0.0.0', debug=False)

if __name__ == '__main__':
    main()
