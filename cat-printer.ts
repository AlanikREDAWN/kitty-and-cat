// import { CatPrinter } from "@opuu/cat-printer";


// const printer = new CatPrinter({ debug: true });

// export async function connectPrinter() {
//     try {
//         await printer.connect();
//         console.log('Connected to printer!');


//         await printer.printText('Hello World!', {
//             fontSize: 24,
//             fontWeight: 'bold',
//             align: 'center',
//             lineSpacing: 8
//         });

//         await printer.feed(100);

//         await printer.disconnect();
//     } catch (error) {
//         console.error('Error during printing:', error);
//     }
// }

import { $ } from "bun";

export async function printCat(message: String, user: String) {
    try {
        // const formattedMessage = "\n" + message
        const formattedMessage = message + " from " + user
        await $`python3 MXW01print.py -t "${formattedMessage}" -d "${process.env.PRINTER}"`
    } catch (error) {
        console.error('Error:', error)
    }
}