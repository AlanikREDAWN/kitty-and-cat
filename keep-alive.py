# simple python script to keep the bluetooth connection between my raspberry pi and the printer alive
# this is running as a systemd service on the pi

import asyncio
import sys
from bleak import BleakScanner, BleakClient
import os
from dotenv import load_dotenv

load_dotenv()

PRINTER_ADDRESS = os.getenv("PRINTER")

async def main():
    while True:
        try:
            device = await BleakScanner.find_device_by_address(PRINTER_ADDRESS, timeout=15.0)
            if device is None:
                print("Printer not found, retrying...")
                await asyncio.sleep(5)
                continue
            async with BleakClient(device) as client:
                print("Keep-alive connected:", client.is_connected)
                while client.is_connected:
                    await asyncio.sleep(5)
                print("Disconnected, trying to reconnect...")
        except Exception as e:
            print("Error", e)
            await asyncio.sleep(5)

asyncio.run(main())