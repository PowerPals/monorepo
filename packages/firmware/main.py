from network import WLAN
from urequests import post
from ubinascii import hexlify
from time import sleep
from random import randint

nic = WLAN(WLAN.IF_STA)
nic.active(True)
nic.connect("UoB-IoT", "f9p9wwc4")
print("connected")

mac = nic.config("mac")
hex_mac = hexlify(mac, ":").decode()

resp = post("https://powerpal.palk.dev/devices", json={
    "user_id": "cu_0000000000001",
    "hardware_address": hex_mac
})

my_id = resp.json()["id"]
print("registered")

while True:
    sleep(5)
    try:
        r = post("https://powerpal.palk.dev/power_logs/log", json={
            "device_id": my_id,
            "power_watts": randint(5, 200)
        })
    except Exception as e:
        print(e)
