import requests, random, string, time

def get_token():
    task = requests.get("https://clodpler.vrypt.my.id/turnstile?url=https://api.siputzx.my.id&sitekey=0x4AAAAAAA6dZGHl6b5dKTOR").json()
    task_id = task["task_id"]
    time.sleep(5)
    r = requests.get(f"https://clodpler.vrypt.my.id/result?id={task_id}").json()
    return r.get("value")

def rand_str(n=8):
    return ''.join(random.choices(string.ascii_letters, k=n))

def rand_email():
    return rand_str(6)+"@"+rand_str(5)+".com"

token = get_token()
if token:
    payload = {
        "type": random.choice(["bug","feature","support"]),
        "name": rand_str(10),
        "email": rand_email(),
        "whatsapp": str(random.randint(6200000000000,6299999999999)),
        "featureName": rand_str(12),
        "description": rand_str(30),
        "token": token
    }
    r = requests.post("https://api.siputzx.my.id/api/support", json=payload)
    print(r.status_code, r.text)
