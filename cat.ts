import { kitty_cat_playground, greetings, delay } from "./consts";
import { cat_client, kitty_app, kitty_client, cat_app } from "./client";


var kitty_greetings = ["hewo", "hi", "hello", ":kitty-wave:", "hey"];

export function catTriggers() {
    // (Greeting) + Kitty trigger
    cat_app.event('message', async (event) => {
        if (event.payload.subtype) return;
        if (event.payload.channel !== kitty_cat_playground) return;

        // console.log(event)
        for (const greeting of greetings) {
            if (event.payload.text?.toLowerCase().includes(greeting.toLowerCase())) {
                if (event.payload.text.toLowerCase().includes("cat")) {
                    var randomGreeting = Math.floor(Math.random() * cat_greetings.length);
                    var randomKittyGreeting = Math.floor(Math.random() * kitty_greetings.length);

                    await cat_client.chat.postMessage({
                        channel: kitty_cat_playground,
                        text: `${cat_greetings[randomGreeting]} <@${event.payload.user}>. What's up?`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await delay(2000);

                    await kitty_client.chat.postMessage({
                        channel: kitty_cat_playground,
                        text: `${kitty_greetings[randomKittyGreeting]} <@${event.payload.user}>! Don't forget to include me too <3`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });
                };
            };
        };
    });


}