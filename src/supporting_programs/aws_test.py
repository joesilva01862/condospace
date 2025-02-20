from aws import AWS
import os
import json

BUCKET_NAME = "blueriver-bucket"
AWS_ACCESS_KEY_ID = "AKIAVUZQPPJSQ4KJK5PX"

LIGHTSAIL_BUCKET_NAME = "bucket-8wzlf7"
LIGHTSAIL_AWS_ACCESS_KEY_ID = "AKIAYHS2KFRQ6VRMGBE5"

aws = AWS("customers", LIGHTSAIL_BUCKET_NAME, LIGHTSAIL_AWS_ACCESS_KEY_ID, LIGHTSAIL_AWS_SECRET_ACCESS_KEY)


CUSTOMER_ID = "demo"
print(f"these are the contents of customer: {CUSTOMER_ID}")
file_list = aws.get_file_list(CUSTOMER_ID)
for file in file_list:
    print(file)

folder = "uploadedfiles"
print(f"these are the contents of customer {CUSTOMER_ID}, folder: {folder}")
file_list = aws.get_file_list_folder(CUSTOMER_ID, folder)
for file in file_list:
    print(file)


def get_files(folder, pattern):
    files = aws.get_file_list_folder(CUSTOMER_ID, folder)
    if pattern:
        arr = [x for x in files if x.startswith(f"{CUSTOMER_ID}/{folder}/{pattern}")]
    else:
        arr = files
    files_arr = []
    for file in arr:
        files_arr.append(os.path.basename(file))    
    files_arr.sort()
    return files_arr



'''
print("\n\nthese are the files with pattern:")
print(get_files("uploadedfiles/protected/docs/financial", "Fin-2020"))

print(aws.upload_file(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic001.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic001.jpg"))
print(aws.upload_file(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic002.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic002.jpg"))
print(aws.upload_file(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic003.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic003.jpg"))
print(aws.upload_file(f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic004.jpg",
                      f"{CUSTOMER_ID}/uploadedfiles/unprotected/listing/unitA1/pics/pic004.jpg"))

#print(aws.upload_file("customers/demo/serverfiles/info.json", "demo/serverfiles/info.json"))
#print(aws.upload_file("customers/customer1/serverfiles/info.json", "customer1/serverfiles/info.json"))
#print(aws.upload_file("customers/customer2/serverfiles/info.json", "customer2/serverfiles/info.json"))


#print(aws.upload_file("customers/root/serverfiles/config.json",    "root/serverfiles/config.json"))
#print(aws.upload_file("customers/root/serverfiles/info.json",      "root/serverfiles/info.json"))
#print(aws.upload_file("customers/root/serverfiles/residents.json", "root/serverfiles/residents.json"))
'''


# this will add the prefix "customers" to the object name before adding it to the bucket
print(aws.upload_file("customers/demo/serverfiles/test.json", "demo/serverfiles/test.json"))

# now read the same file back, and print it
string_content = aws.read_text_obj(f"{CUSTOMER_ID}/serverfiles/test.json")
print(f"\nThe file read back is:\n{string_content}")



