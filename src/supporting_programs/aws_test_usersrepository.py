
from users import UsersRepository
import json
from aws import AWS

BUCKET_PREFIX = "customers"

with open("serverfiles/config.json", 'r') as f:
    str_content = f.read()
    config = json.loads(str_content)['config']
    print(f"\nSome of the config vars:")
    print(f"API Url: {config['api_url']}")
    print(f"API app type: {config['api_app_type']}")
    print(f"AWS bucket name: {config['bucket_name']}")
    print(f"Domain name: {config['domain']}")

aws = AWS(BUCKET_PREFIX, config['bucket_name'], config['aws_access_key_id'], config['aws_secret_access_key'])

users_repository = UsersRepository(aws)

def handle_users():
    users_repository.load_users("demo")
    userid = "unitA5"
    user = users_repository.get_user_by_userid(userid)
    print(f"unit A1: {user.id}, {user.unit}, {user.userid}, {user.name}  ")

def delete_user(userid):
    print(f"count: {users_repository.get_count()}")
    users_repository.delete_user_by_userid(userid)
    print(f"count: {users_repository.get_count()}")

def list_users():
    for user in users_repository.get_users():
        print(f"{user.id}, {user.unit}, {user.userid}, {user.name}  ")

if __name__ == "__main__":
    list_users()
    handle_users()
    userid = "unitA5"
    delete_user(userid)
    list_users()


