import network
import requests
import ubinascii
import time

nic = network.WLAN(network.WLAN.IF_STA)
nic.active(True)
nic.connect("UoB-IoT", "f9p9wwc4")
print("connected")

def register():
    mac = nic.config("mac")
    hex_mac = ubinascii.hexlify(mac, ":").decode()

    resp = requests.post("https://powerpal.palk.dev/devices", json={
        "user_id": "cu_0000000000001",
        "hardware_address": hex_mac
    })

    return resp.json()["id"]

def log_power(device_id, power_watts):
    requests.post("https://powerpal.palk.dev/power_logs/log", json={
        "device_id": device_id,
        "power_watts": power_watts
    })
    print(f"Logged power {power_watts}.")

my_id = register()
print("registered")

while True:
    log_power(my_id, 2)
    time.sleep(5)
