import { $ } from "bun";

export async function printCat(message: String, user: String) {
    try {
        // const formattedMessage = "\n" + message
        const formattedMessage = message + " from " + user
        await $`python3 MXW01print.py -t "${formattedMessage}" -d "${process.env.PRINTER}" -n "Geist Pixel" -z 24`
    } catch (error) {
        console.error('Error:', error)
    }
}