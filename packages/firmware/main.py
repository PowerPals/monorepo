import network
import requests

nic = network.WLAN(network.WLAN.IF_STA)
nic.active(True)
nic.connect("UoB-IoT", "f9p9wwc4")

def register():

