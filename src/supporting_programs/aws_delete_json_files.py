import sys
sys.path.append('..')
from aws import AWS
import os
import json

BUCKET_NAME = "blueriver-bucket-test"
KEY_FILE = "key_file_test.json"

with open(KEY_FILE, 'r') as f:
    str_content = f.read()
    config = json.loads(str_content)['config']
    print(f"\nSome of the config vars:")

AWS_ACCESS_KEY_ID = config['aws_access_key_id']
AWS_SECRET_ACCESS_KEY = config['aws_secret_access_key']

aws = AWS("customers", BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)


CUSTOMER_ID = "demo"

print(f"BUCKET: {BUCKET_NAME}")

aws.delete_object(f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
aws.delete_object(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json")

