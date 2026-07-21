import { App } from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import { OpenRouter } from "@openrouter/sdk";

export const kitty_app = new App({
    token: process.env.KITTY_SLACK_TOKEN,
    signingSecret: process.env.KITTY_SIGNING_SECRET,
    // appToken: process.env.KITTY_SLACK_APP_TOKEN,
    // socketMode: true,
});

export const kitty_client = new WebClient(process.env.KITTY_SLACK_USER_TOKEN);

export const cat_app = new App({
    token: process.env.CAT_SLACK_TOKEN,
    signingSecret: process.env.CAT_SIGNING_SECRET,
    // appToken: process.env.CAT_SLACK_APP_TOKEN,
    // socketMode: true,
});

export const cat_client = new WebClient(process.env.CAT_SLACK_USER_TOKEN);

export const ai_client = new OpenRouter({
    apiKey: process.env.AI_API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});