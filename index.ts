import { catTriggers } from "./cat";
import { cat_app, kitty_app, kitty_client, cat_client } from "./client";
import { kittyTriggers } from "./kitty";
import { kitty_cat_playground, greetings, kitty_greetings, cat_greetings, cat_noises } from "./consts";
import { delay } from "./consts";

// kittyTriggers();
// catTriggers();

kitty_app.event('message', async (event) => {
    if (event.payload.subtype) return; // ignore if special message
    if (event.payload.channel !== kitty_cat_playground) return; // ignore if not in #kitty-cat-playground

    if (event.payload.user === 'U0BFMSQD4QK') return; // ignore if message is from Kitty - prevents infinite meowing loops
    if (event.payload.user === 'U0BFQSRV1D3') return; // ignore if message if from Cat - prevents infinite meowing loops

    const hasGreeting: boolean = greetings.some(greeting => {
        const regex = new RegExp(`\\b${greeting}\\b`, 'i');
        return regex.test(event.payload.text);
    });

    const hasCatNoise: boolean = cat_noises.some(cat_noise => {
        const regex = new RegExp(`\\b${cat_noise}\\b`, 'i');
        return regex.test(event.payload.text);
    })

    const kittyRegex = new RegExp(`\\bkitty\\b`, 'i');
    const catRegex = new RegExp(`\\bcat\\b`, 'i');

    if (hasGreeting === true) {
        var randomKittyGreeting = Math.floor(Math.random() * kitty_greetings.length);
        var randomCatGreeting = Math.floor(Math.random() * cat_greetings.length);

        if (kittyRegex.test(event.payload.text) === true) {

            // send Kitty's greeting
            await kitty_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `${kitty_greetings[randomKittyGreeting]} <@${event.payload.user}>!`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
    
            await delay(2000); // wait 2 seconds
    
            // send Cat's greeting
            await cat_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `hey, don't forget about me, <@${event.payload.user}>`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }
    
        if (catRegex.test(event.payload.text) === true) {

            // send Cat's greeting
            await cat_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `${cat_greetings[randomCatGreeting]} <@${event.payload.user}>. What's up?`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        
            await delay(2000); // wait 2 seconds
        
            // send Kitty's greeting
            await kitty_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `${kitty_greetings[randomKittyGreeting]} <@${event.payload.user}>! Don't forget to include me too <3`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }
    }

    if (hasCatNoise === true) {
        var randomKittyNoise = Math.floor(Math.random() * cat_noises.length);
        var randomCatNoise = Math.floor(Math.random() * cat_noises.length);

        
        if (kittyRegex.test(event.payload.text) === true) {
            await kitty_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `${cat_noises[randomKittyNoise]}`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }

        if (catRegex.test(event.payload.text) === true) {
            await cat_client.chat.postMessage({
                channel: kitty_cat_playground,
                text: `${cat_noises[randomCatNoise]}`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }

        
        await kitty_client.chat.postMessage({
            channel: kitty_cat_playground,
            text: `${cat_noises[randomKittyNoise]}`,
            thread_ts: event.payload.thread_ts || event.payload.ts,
        });

        await cat_client.chat.postMessage({
            channel: kitty_cat_playground,
            text: `${cat_noises[randomCatNoise]}`,
            thread_ts: event.payload.thread_ts || event.payload.ts,
        });
        
    }


    

    



});

await kitty_app.start();
await cat_app.start();