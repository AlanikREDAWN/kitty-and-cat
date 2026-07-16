import { catTriggers } from "./cat";
import { cat_app, kitty_app, kitty_client, cat_client } from "./client";
import { kittyTriggers } from "./kitty";
import { kitty_cat_playground, kitty_cat_control_room, greetings, kitty_greetings, cat_greetings, cat_noises } from "./consts";
import { delay } from "./consts";

// kittyTriggers();
// catTriggers();

kitty_app.event('message', async (event) => {
    if (event.payload.subtype) return; // ignore if special message
    if (event.payload.channel !== kitty_cat_playground && event.payload.channel !== kitty_cat_control_room) return; // ignore if not in #kitty-cat-playground

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

    

    // assign channel to post in
    let channel: string;
    if (event.payload.channel === kitty_cat_control_room) {
        channel = kitty_cat_control_room
    } else {
        channel = kitty_cat_playground
    }

    const kittyRegex = new RegExp(`\\bkitty\\b`, 'i');
    const catRegex = new RegExp(`\\bcat\\b`, 'i');
    const statusRegex = new RegExp(`\\bstatus\\b`, 'i');
    const doppelStatusRegex = new RegExp(`\\bdoppel\\b`, 'i');
    const noneStatusRegex = new RegExp(`\\bnone\\b`, 'i');
    const partyStatusRegex = new RegExp(`\\bparty\\b`, 'i');
    const wowStatusRegex = new RegExp(`\\bwow\\b`, 'i');
    const boomStatusRegex = new RegExp(`\\bboom\\b`, 'i');

    if (hasGreeting === true) {
        var randomKittyGreeting = Math.floor(Math.random() * kitty_greetings.length);
        var randomCatGreeting = Math.floor(Math.random() * cat_greetings.length);

        if (kittyRegex.test(event.payload.text) === true) {

            // send Kitty's greeting
            await kitty_client.chat.postMessage({
                channel: channel,
                text: `${kitty_greetings[randomKittyGreeting]} <@${event.payload.user}>!`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
    
            await delay(2000); // wait 2 seconds
    
            // send Cat's greeting
            await cat_client.chat.postMessage({
                channel: channel,
                text: `hey, don't forget about me, <@${event.payload.user}>`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }
    
        if (catRegex.test(event.payload.text) === true) {

            // send Cat's greeting
            await cat_client.chat.postMessage({
                channel: channel,
                text: `${cat_greetings[randomCatGreeting]} <@${event.payload.user}>. What's up?`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        
            await delay(2000); // wait 2 seconds
        
            // send Kitty's greeting
            await kitty_client.chat.postMessage({
                channel: channel,
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
                channel: channel,
                text: `${cat_noises[randomKittyNoise]}`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }

        if (catRegex.test(event.payload.text) === true) {
            await cat_client.chat.postMessage({
                channel: channel,
                text: `${cat_noises[randomCatNoise]}`,
                thread_ts: event.payload.thread_ts || event.payload.ts,
            });
        }

        
        await kitty_client.chat.postMessage({
            channel: channel,
            text: `${cat_noises[randomKittyNoise]}`,
            thread_ts: event.payload.thread_ts || event.payload.ts,
        });

        await cat_client.chat.postMessage({
            channel: channel,
            text: `${cat_noises[randomCatNoise]}`,
            thread_ts: event.payload.thread_ts || event.payload.ts,
        });
        
    }

    if (channel === kitty_cat_control_room) {
        if (statusRegex.test(event.payload.text) === true) {
            
            if (doppelStatusRegex.test(event.payload.text) === true) {
                
                if (kittyRegex.test(event.payload.text) === true) {
                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `okay! changing status to doppel!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await kitty_client.users.profile.set({
                        profile: {
                            "status_text": "doppel!",
                            "status_emoji": ":doppel-hi:",
                            "status_expiration": 0,
                        }
                    })

                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `status successfully changed to doppel!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }

                if (catRegex.test(event.payload.text) === true) {
                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `changing status to doppel, as requested`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await cat_client.users.profile.set({
                        profile: {
                            "status_text": "doppel!",
                            "status_emoji": ":doppel-hi:",
                            "status_expiration": 0,
                        }
                    })

                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `status changed to doppel`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }
            }

            if (noneStatusRegex.test(event.payload.text) === true) {

                if (kittyRegex.test(event.payload.text) === true) {
                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `clearing status!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await kitty_client.users.profile.set({
                        profile: {
                            "status_text": "",
                            "status_emoji": "",
                            "status_expiration": 0,
                        }
                    })

                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `done!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }

                if (catRegex.test(event.payload.text) === true) {
                    await cat_client.chat.postMessage({
                        channel: channel, 
                        text: `setting status to none`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await cat_client.users.profile.set({
                        profile: {
                            "status_text": "",
                            "status_emoji": "",
                            "status_expiration": 0,
                        }
                    })

                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `status successfully set to none`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }
            }

            if (partyStatusRegex.test(event.payload.text) === true) {

                if (kittyRegex.test(event.payload.text) === true) {
                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `setting status to party!!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })

                    await kitty_client.users.profile.set({
                        profile: {
                            "status_text": "PARTY!!",
                            "status_emoji": ":meow-party:",
                            "status_expiration": 0,
                        }
                    })

                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `WOO LET'S PARTY!!!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }

                if (catRegex.test(event.payload.text) === true) {
                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `setting status to party`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await cat_client.users.profile.set({
                        profile: {
                            "status_text": "PARTY!!",
                            "status_emoji": ":meow-party:",
                            "status_expiration": 0,
                        }
                    })

                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `It's time to party I guess...yay`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }
            }

            if (wowStatusRegex.test(event.payload.text) === true) {

                if (kittyRegex.test(event.payload.text) === true) {
                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `woah! changing status to wow!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })

                    await kitty_client.users.profile.set({
                        profile: {
                            "status_text": "WOW",
                            "status_emoji": ":kitty-wow:",
                            "status_expiration": 0,
                        }
                    })

                    await kitty_client.chat.postMessage({
                        channel: channel,
                        text: `wow! what an amazing status!`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    })
                }

                if (catRegex.test(event.payload.text) === true) {
                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `setting status to wow`,
                        thread_ts: event.payload.thread_ts || event.payload.ts,
                    });

                    await cat_client.users.profile.set({
                        profile: {
                            "status_text": "wow",
                            "status_emoji": ":kitty-wow:",
                            "status_expiration": 0,
                        }
                    })

                    await cat_client.chat.postMessage({
                        channel: channel,
                        text: `wow, I'm just amazed at this status`,
                        thread_ts: event.payload.thread_ts || event.payload.ts
                    })
                }
            }

            if (boomStatusRegex.test(event.payload.text) === true) {

                if (kittyRegex.test(event.payload.text) === true) {
                    
                }
            }


        }
    }




});

await kitty_app.start();
await cat_app.start();