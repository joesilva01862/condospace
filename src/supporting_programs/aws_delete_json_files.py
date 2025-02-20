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

print(f"BUCKET: {BUCKET_NAME}")

aws.delete_object(f"{CUSTOMER_ID}/uploadedfiles/unprotected/eventpics/eventpics.json")
aws.delete_object(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listings/listings.json")

