import { kitty_cat_playground, greetings, delay } from "./consts";
import { cat_client, kitty_app, kitty_client } from "./client";




export function kittyTriggers() {
    // (Greeting) + Kitty trigger
    kitty_app.event('message', async (event) => {
        if (event.payload.subtype) return;
        if (event.payload.channel !== kitty_cat_playground) return;

        // console.log(event)
        for (const greeting of greetings) {
            if (event.payload.text?.toLowerCase().includes(greeting.toLowerCase())) {
                if (event.payload.text.toLowerCase().includes("kitty")) {
                    var randomGreeting = Math.floor(Math.random() * kitty_greetings.length);

                    await kitty_client.chat.postMessage({
                        channel: kitty_cat_playground,
                        text: `${kitty_greetings[randomGreeting]} <@${event.payload.user}>!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await delay(2000);

                    await cat_client.chat.postMessage({
                        channel: kitty_cat_playground,
                        text: `hey, don't forget about me, <@${event.payload.user}>`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });
                };
            };
        };
    });


}





// app.message(async (event) => {
//     if (event.payload.subtype) return;

//     await client.chat.postMessage({
//         channel: kitty_cat_playground,
//         text: "meow",
//     });
// })

