import sys
sys.path.append('..')
from aws import AWS
import os
import json

#BUCKET_NAME = "blueriver-bucket-test"
#BUCKET_NAME = "blueriver-bucket"
#AWS_ACCESS_KEY_ID = "AKIAVUZQPPJSQ4KJK5PX"
#AWS_SECRET_ACCESS_KEY = "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"

BUCKET_NAME = "bucket-8wzlf7"
AWS_ACCESS_KEY_ID = "AKIAYHS2KFRQ6VRMGBE5"
AWS_SECRET_ACCESS_KEY = "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"




aws = AWS("customers", BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)

CUSTOMER_ID = "demo"

print(f"BUCKET: {BUCKET_NAME}")

'''
aws.upload_file("../customers/demo/uploadedfiles/unprotected/eventpics/eventpics.json", f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
string_content = aws.read_text_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
json_content = json.loads(string_content)
print(f"json event content: {json_content}")

print("\n")

aws.upload_file("../customers/demo/uploadedfiles/unprotected/listings/listings.json", f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json")
string_content = aws.read_text_obj(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json")
json_content = json.loads(string_content)
print(f"json listing content: {json_content}")

print("\n")
'''

aws.upload_file(f"../customers/{CUSTOMER_ID}/serverfiles/info.json", f"{CUSTOMER_ID}/serverfiles/info.json")
string_content = aws.read_text_obj(f"{CUSTOMER_ID}/serverfiles/info.json")
json_content = json.loads(string_content)
print(f"info.json content: {json_content}")
