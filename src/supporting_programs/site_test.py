from threading import Thread, Lock
from time import sleep
import requests
import random

HOSTNAME = "localhost"
PORT_NUMBER = 5000
TENANTS = ['customer1', 'customer2']

update_data = {
    'customer1': {
        'names': ['Francisca Ballot', 'Ariana Melo', 'Pedro Malaga'],
        'emails': ['francisca@gmail.com', 'ariana@gmail.com', 'pedro@gmail.com'],
        'phones': ['301 345-8991', '891 781-7899', '781 781-8401'],
    },
    'customer2': {
        'names': ['Maria Anastacia', 'Fernando Galego', 'Marta Suplicy'],
        'emails': ['maria.anastacia@gmail.com', 'fernando.galego@gmail.com', 'marta.suplicy@gmail.com'],
        'phones': ['501 456-8911', '603 781-7833', '617 781-7723'],
    }
}

data = {
       'customer1': {
           '1': {
             'name': 'Arthur Andrade',
             'email': 'arthur@gmail.com',
             'phone': '508 789-8711'
           },
           '2': {
             'name': 'Ana Pedrosa Alves',
             'email': 'ana@gmail.com',
             'phone': '341 891-3435'
           },
           '3': {
             'name': 'Maria Franco',
             'email': 'maria@gmail.com',
             'phone': '341 781-7899'
           }
       },
       'customer2': {
            '1': {
                'name': 'Pedro Molina',
                'email': 'pedro.molina@gmail.com',
                'phone': '603 595-7667'
            },
            '2': {
                'name': 'Juramar Felix',
                'email': 'juramar@bu.edu',
                'phone': '603 809-7528'
            },
            '3': {
                'name': 'Adrian Jackson',
                'email': 'adrian.jackson33@icloud.com',
                'phone': '508 958-1034'
            }
       }
}


def invoke_get_resident(tenant, unit_number):
    url = f"http://{tenant}.{HOSTNAME}:{PORT_NUMBER}/getresident"
    post_payload = {f'request': {'type': 'unit', 'id': f'{unit_number}'}}
    r = requests.post(url, json=post_payload)
    return r.json()['response']


def db_save_resident(tenant, user_data):
    url = f"http://{tenant}.{HOSTNAME}:{PORT_NUMBER}/saveresident"
    r = requests.post(url, json={'resident': user_data})
    return r.json()['response']


def get_resident_thread(tenant, lock):
    print(f"get_resident_thread() tenant: {tenant}")
    while True:
        for i in range(1, 4): # this mean from 1 to 3
            resp = invoke_get_resident(tenant, i)
            user = resp['resident']
            unit = str(i)
            if user['name'] != data[tenant][unit]['name']:
                print(f"{tenant}: name difference in get_resident_thread, pid {resp['pid']}. db: [{user['name']}]  expected: [{data[tenant][unit]['name']}]")
                exit(0)
            if user['email'] != data[tenant][unit]['email']:
                print(f"{tenant}: email difference in get_resident_thread, pid {resp['pid']}. db: [{user['email']}]  expected: [{data[tenant][unit]['email']}]")
                exit(0)
            if user['phone'] != data[tenant][unit]['phone']:
                print(f"{tenant}: phone difference in get_resident_thread, pid {resp['pid']}. db: [{user['phone']}]  expected: [{data[tenant][unit]['phone']}]")
                exit(0)
            sleep_secs = random.randint(1,3)
            print(f"get_resident_thread({tenant}) thread, pid {resp['pid']} sleeping for {sleep_secs} seconds")
            sleep(sleep_secs)

'''
   I use lock.acquire() here to protect the data in "data"
'''
def save_resident_thread(tenant, lock):
    while True:
        for unit in range(1, 4): # this mean from 1 to 3
            lock.acquire()
            global data
            index = random.randint(0,2) # from 0 to 2
            unit = str(unit)
            name = update_data[tenant]['names'][index]
            email = update_data[tenant]['emails'][index]
            phone = update_data[tenant]['phones'][index]
            user = invoke_get_resident(tenant, unit)['resident']
            user['name'] = name
            user['email'] = email
            user['phone'] = phone
            resp = db_save_resident(tenant, user)
            data[tenant][unit]['name'] = name
            data[tenant][unit]['phone'] = phone
            data[tenant][unit]['email'] = email
            lock.release()
            sleep_secs = random.randint(2,5)
            print(f"save_resident_thread({tenant}), pid {resp['pid']}, sleeping for {sleep_secs} seconds")
            sleep(sleep_secs) # sleep from 3 to 6 secs


def print_resident(json_user):
    print(f"name: {json_user['name']}  email: {json_user['email']}  phone: {json_user['phone']}")

'''
    This is to start the program with a known state of data
'''
tenant = 'customer1'
for unit in range(1,4):
    user = invoke_get_resident(tenant, unit)['resident']
    unit = str(unit)
    user['name'] = data[tenant][unit]['name']
    user['email'] = data[tenant][unit]['email']
    user['phone'] = data[tenant][unit]['phone']
    resp = db_save_resident(tenant, user)
    print(f"resp: {resp}")
print(f"all units for tenant {tenant} updated")

tenant = 'customer2'
for unit in range(1,4):
    user = invoke_get_resident(tenant, unit)['resident']
    unit = str(unit)
    user['name'] = data[tenant][unit]['name']
    user['email'] = data[tenant][unit]['email']
    user['phone'] = data[tenant][unit]['phone']
    resp = db_save_resident(tenant, user)
    print(f"resp: {resp}")
print(f"all units for tenant {tenant} updated")




lock = Lock()

get_resident_thread1 = Thread(target=get_resident_thread, args=('customer1', lock,))
get_resident_thread2 = Thread(target=get_resident_thread, args=('customer2', lock,))
save_resident_thread1 = Thread(target=save_resident_thread, args=('customer1', lock,))
save_resident_thread2 = Thread(target=save_resident_thread, args=('customer2', lock,))

get_resident_thread1.start()
get_resident_thread2.start()
save_resident_thread1.start()
save_resident_thread2.start()


