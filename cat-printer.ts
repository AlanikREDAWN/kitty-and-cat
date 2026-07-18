import { $ } from "bun";

let printQueue: Promise<void> = Promise.resolve()

export async function printCat(message: String, user: String) {
    const result = printQueue.then(() => sendPrint(message, user));

    printQueue = result.catch(() => {});
    return result;
}

async function sendPrint(message: String, user: String) {
    try {
        const formattedMessage = message + " from " + user

        await $`sudo systemctl stop cat-printer-keepalive`
        
        await Bun.sleep(1000)

        await $`python3 MXW01print.py -t "${formattedMessage}" -d "${process.env.PRINTER}" -n "Geist Pixel" -z 24`

        await $`sudo systemctl start cat-printer-keepalive`
    } catch (error) {
        await $`sudo systemctl start cat-printer-keepalive`.catch(() => {})
        throw error
    }
}