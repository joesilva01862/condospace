
from threading import Thread
from time import sleep
import random
import requests
import json


HOSTNAME = "localhost"
PORT_NUMBER = 5000
TENANTS = ['customer1', 'customer2']

def get_values():
    values = []
    for i in range(5):
        values.append(random.randint(0, 9))  # from 0 to 9
    return values

def get_values2():
    values = []
    for i in range(5):
        values.append(random.randint(0, 9))  # from 0 to 9
    return values

def get_values3():
    values = []
    for i in range(5):
        values.append(random.randint(0, 9))  # from 0 to 9
    return values

def invoke_server_th1(name: str):
    while True:
        url = f"http://{HOSTNAME}:{PORT_NUMBER}/change_data"
        values = get_values()
        print(f"sent array: {values}")
        req = { "name": name, "array": values }
        post_payload = { "request": req }
        r = requests.post(url, json=post_payload)
        rec_array = r.json()['array']
        if values != rec_array:
            print(f"********* thread: {name}, values different, program exiting **********")
            print(f"sent: {values},  received: {rec_array}")
            break
        print(f"resp: {rec_array}, server {name} going to sleep")
        sleep(3)

def invoke_server_th2(name: str):
    while True:
        url = f"http://{HOSTNAME}:{PORT_NUMBER}/change_data"
        values = get_values()
        print(f"sent array: {values}")
        req = { "name": name, "array": values }
        post_payload = { "request": req }
        r = requests.post(url, json=post_payload)
        rec_array = r.json()['array']
        if values != rec_array:
            print(f"********* thread: {name}, values different, program exiting **********")
            print(f"sent: {values},  received: {rec_array}")
            break
        print(f"resp: {rec_array}, server {name} going to sleep")
        sleep(2)

def invoke_server_th3(name: str):
    while True:
        url = f"http://{HOSTNAME}:{PORT_NUMBER}/change_data"
        values = get_values3()
        print(f"sent array: {values}")
        req = { "name": name, "array": values }
        post_payload = { "request": req }
        r = requests.post(url, json=post_payload)
        rec_array = r.json()['array']
        if values != rec_array:
            print(f"********* thread: {name}, values different, program exiting **********")
            print(f"sent: {values},  received: {rec_array}")
            break
        print(f"resp: {rec_array}, server {name} going to sleep")
        sleep(1)



'''
thread1 = Thread(target=modify_data1, args=('thread1', lock,))
thread2 = Thread(target=modify_data2, args=('thread2', lock,))
thread3 = Thread(target=modify_data3, args=('thread3', lock,))
thread1.start()
thread2.start()
thread3.start()
'''

thread1 = Thread(target=invoke_server_th1, args=('thread1',))
thread2 = Thread(target=invoke_server_th2, args=('thread2',))
thread3 = Thread(target=invoke_server_th3, args=('thread3',))
thread1.start()
thread2.start()
thread3.start()




