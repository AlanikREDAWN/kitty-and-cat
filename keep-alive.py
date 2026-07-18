# simple python script to keep the bluetooth connection between my raspberry pi and the printer alive
# this is running as a systemd service on the pi

import asyncio
import signal
from bleak import BleakScanner, BleakClient
import os
from dotenv import load_dotenv

load_dotenv()

PRINTER_ADDRESS = os.getenv("PRINTER")

shutdown_event = asyncio.Event()

def handle_shutdown():
    print("Shutdown signal received, time to disconnect!")
    shutdown_event.set()

async def main():
    loop = asyncio.get_running_loop()
    loop.add_signal_handler(signal.SIGTERM, handle_shutdown)
    loop.add_signal_handler(signal.SIGINT, handle_shutdown)

    while not shutdown_event.is_set():
        try:
            device = await BleakScanner.find_device_by_address(PRINTER_ADDRESS, timeout=15.0)
            if device is None:
                print("Printer not found, retrying...")
                await asyncio.sleep(5)
                continue
            client = BleakClient(device)
            await client.connect()
            print("Keep-alive connected:", client.is_connected)
            
            while client.is_connected and not shutdown_event.is_set():
                await asyncio.sleep(1)
            
            if client.is_connected:
                print("Disconnecting now!")
                await client.disconnect()
                print("successfully disconnected!")
            else:
                print("disconnected, trying to reconnect...")
        except Exception as e:
            print("Error", e)
            await asyncio.sleep(5)
    print("Exiting keep-alive")

asyncio.run(main())