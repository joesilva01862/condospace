import os

import boto3
import json

KEY_FILE = "key_file.json"

with open(KEY_FILE, 'r') as f:
    str_content = f.read()
    config = json.loads(str_content)['config']
    print(f"\nSome of the config vars:")

#BUCKET_NAME = "blueriver-bucket"
AWS_ACCESS_KEY_ID = config['aws_access_key_id']
AWS_SECRET_ACCESS_KEY = config['aws_secret_access_key']


# Create S3 client
s3 = boto3.client("s3", aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY,)

# Store bucket name
bucket_name = "blueriver-bucket"

# Store contents of bucket
objects_list = s3.list_objects_v2(Bucket=bucket_name).get("Contents")

# Iterate over every object in bucket
print("These are the objects in the bucket:")
for obj in objects_list:
    #  Store object name
    obj_name = obj["Key"]
    print(f'object name: {obj_name}')
    
   
    
# Read an object from the bucket
response = s3.get_object(Bucket=bucket_name, Key='demo/serverfiles/info.json')
#obj = s3.Bucket('cheez-willikers').Object('/demo/config.json').get()

# Read the object’s content as text
object_content = response["Body"].read().decode("utf-8")

# Print all the contents
print("\n\n")
print(f"Contents of {obj_name}:")
print(object_content, end="\n\n")


