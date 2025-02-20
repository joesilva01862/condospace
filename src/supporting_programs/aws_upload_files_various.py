import sys
sys.path.append('..')
from aws import AWS
import os
import json

BUCKET_NAME = "blueriver-bucket-test"

#BUCKET_NAME = "blueriver-bucket"
AWS_ACCESS_KEY_ID = "AKIAVUZQPPJSQ4KJK5PX"
AWS_SECRET_ACCESS_KEY = "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"


aws = AWS("customers", BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)


CUSTOMER_ID = "demo"
print(f"these are the contents of customer: {CUSTOMER_ID}")
file_list = aws.get_file_list(CUSTOMER_ID)
for file in file_list:
    print(file)

folder = "uploadedfiles"


'''
print(aws.upload_binary_obj(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic001.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic001.jpg"))
print(aws.upload_binary_obj(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic002.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic002.jpg"))
print(aws.upload_binary_obj(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic003.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic003.jpg"))
print(aws.upload_binary_obj(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic004.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic004.jpg"))
'''

'''
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitA1/pics/cover.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitA1/pics/cover.jpg", file_handle.read()))
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/cover.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/cover.jpg", file_handle.read()))
'''

'''
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic001.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic001.jpg", file_handle.read()))
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic002.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic002.jpg", file_handle.read()))
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic003.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic003.jpg", file_handle.read()))
file_handle = open(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic004.jpg", "rb")
print(aws.upload_binary_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/unitD23/pics/pic004.jpg", file_handle.read()))
'''

'''
folder = f"uploadedfiles/unprotected/listing/unitA1/pics"
print(f"these are the listing pics of customer {CUSTOMER_ID}, folder: {folder}")
file_list = aws.get_file_list_folder(CUSTOMER_ID, folder)
if len(file_list) == 0:
    print("no files were retrieved")
else:
    for file in file_list:
        print(file)
'''



#print(aws.upload_file("customers/demo/serverfiles/info.json", "demo/serverfiles/info.json"))
#print(aws.upload_file("customers/customer1/serverfiles/info.json", "customer1/serverfiles/info.json"))
#print(aws.upload_file("customers/customer2/serverfiles/info.json", "customer2/serverfiles/info.json"))


#print(aws.upload_file("customers/root/serverfiles/config.json",    "root/serverfiles/config.json"))
#print(aws.upload_file("customers/root/serverfiles/info.json",      "root/serverfiles/info.json"))
#print(aws.upload_file("customers/root/serverfiles/residents.json", "root/serverfiles/residents.json"))

'''
print(f"\n\nall units in the listing folder:")
folder = f"uploadedfiles/unprotected/listing"
file_list = aws.get_folder_list(CUSTOMER_ID, folder)
for file in file_list:
    start = file.find("/listing/") + len("/listing/")
    end = file.find("/pics/")
    print(f"folder is {file[start:end]}")
'''

#print(aws.upload_file(f"customers/{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json", f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json"))
#string_content = aws.read_text_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json")
#print(json.loads(string_content))



#print(aws.upload_file("customers/demo/uploadedfiles/unprotected/listings/listings.json", "demo/uploadedfiles/unprotected/listings/listings.json"))
#print(aws.upload_file("customers/demo/uploadedfiles/unprotected/listings/listings.json", "demo/listings.json"))



#print(aws.upload_file("customers/demo/serverfiles/info.json", f"{CUSTOMER_ID}/serverfiles/info.json"))
#print(aws.upload_file("customers/demo/serverfiles/links.json", f"{CUSTOMER_ID}/serverfiles/links.json"))

print(f"BUCKET: {BUCKET_NAME}")
'''
file_handle = open(f"../customers/{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
file_content = file_handle.read()
json_string = json.dumps(file_content)
aws.upload_text_obj("customers/demo/uploadedfiles/unprotected/eventpics/eventpics.json", json_string)
'''

aws.upload_file("../customers/demo/uploadedfiles/unprotected/eventpics/eventpics.json", f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
string_content = aws.read_text_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
events = json.loads(string_content)
for key, event in events['event_pictures'].items():
    print(f"loop key: {key}")

print(f"key: {events['event_pictures']['this_is_a_great_event']['title']}, date {events['event_pictures']['this_is_a_great_event']['date']}")





#text_retrieved = aws.read_text_obj(f"{CUSTOMER_ID}/serverfiles/info.json")
#print(f"\n\nThis is the content of info.json from aws: \n{text_retrieved}")
