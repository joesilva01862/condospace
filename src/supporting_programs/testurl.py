
customers = {'demo': 'Demonstration CondoSpace.app website',
             'customer1': 'This is our first customer',
             'customer2': 'This is our second customer'
             }

config = {'domain': 'condospace'}

def get_tenant_x(url):
    dot = url.find('.')
    if dot == -1:
        tenant = 'root'
    else:
        #print("not root")
        posbar = url.find('//')
        #print(f" posbar: {posbar}")
        if posbar == -1:
            tenant = url[:dot]
        else:
            tenant = url[posbar+2:dot]
            #print(f"inside tenant: {tenant}")
        tenant = tenant.lower()
        if tenant == config['domain']:
            tenant = 'root'

    if tenant != 'root' and tenant not in customers:
        tenant = "tenant_not_found"

    print(f"url: {url},  tenant: {tenant}")
    return tenant

print("customer who doesnt exist:")
tenant_x = get_tenant_x("http://customer3.condospace.app/home")

print("\ncustomer1:")
tenant_x = get_tenant_x("http://customer1.condospace.app/home")
tenant_x = get_tenant_x("http://customer1.condospace.app")
tenant_x = get_tenant_x("customer1.condospace.app")
tenant_x = get_tenant_x("condospace.app")
tenant_x = get_tenant_x("aaa.condospace.app")

print("\n")
tenant_x = get_tenant_x("https://customer2.localhost:5000/home")
tenant_x = get_tenant_x("https://customer2.localhost:5000")
tenant_x = get_tenant_x("customer2.localhost:5000")
tenant_x = get_tenant_x("localhost:5000")
tenant_x = get_tenant_x("abreu.localhost:5000")
