import network
import requests
import ubinascii

nic = network.WLAN(network.WLAN.IF_STA)
nic.active(True)
nic.connect("UoB-IoT", "f9p9wwc4")

def register():
    mac = nic.config("mac")
    hex_mac = ubinascii.hexlify(mac, ":").decode()

    resp = requests.post("https://powerpal.palk.dev/devices", json={
        "user_id": "john",
        "hardware_address": hex_mac
    })

    return resp.json()["id"]

my_id = register()
print(my_id)
