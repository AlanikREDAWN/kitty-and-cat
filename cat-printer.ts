import { $ } from "bun";

export async function printCat(message: String, user: String) {
    try {
        // const formattedMessage = "\n" + message
        const formattedMessage = message + " from " + user

        // await $`sudo systemctl stop cat-printer-keepalive`
        
        await $`python3 -c "
        import asyncio
        from bleak import BleakScanner
        asyncio.run(BleakScanner.find_device_by_address('${process.env.PRINTER}', timeout=10.0))
        "`

        await $`python3 MXW01print.py -t "${formattedMessage}" -d "${process.env.PRINTER}" -n "Geist Pixel" -z 24`

        // await $`sudo systemctl start cat-printer-keepalive`
    } catch (error) {
        // await $`sudo systemctl start cat-printer-keepalive`.catch(() => {})
        throw error
    }
}