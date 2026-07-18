import { $ } from "bun";

let printQueue: Promise<void> = Promise.resolve()

// export type QueueUpdate = 
//     | { status: "queued"; position: number }
//     | { status: "printing" }
//     | { status: "success" }
//     | { status: "failed"; error: string };

// const activeCallbacks: Array<(update: QueueUpdate) => void> = [];

export async function printCat(message: String, user: String) {
    // const currentPosition = activeCallbacks.length - 1;
    // onUpdate?.({ status: "queued", position: currentPosition });

    // const result = printQueue.then(async () => {
    //     const index = activeCallbacks.indexOf(onUpdate!);
    //     if (index !== -1) activeCallbacks.splice(index, 1);

    //     broadcastNewPositions();

    //     onUpdate?.({ status: "printing" });
    //     await sendPrint(message, user);
    // });

    // printQueue = result
    //     .then(() => {
    //         onUpdate?.({ status: "success" });
    //     })
    //     .catch((error) => {
    //         onUpdate?.({ status: "failed", error: error instanceof Error ? error.message : String(error) });

    //         const index = activeCallbacks.indexOf(onUpdate!);
    //         if (index !== -1) {
    //             activeCallbacks.splice(index, 1);
    //             broadcastNewPositions();
    //         }
    //     });
    const result = printQueue.then(() => sendPrint(message, user));

    printQueue = result.catch(() => {});

    return result;
}

// function broadcastNewPositions() {
//     activeCallbacks.forEach((callback, idx) => {
//         callback({ status: "queued", position: idx });
//     });
// }

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