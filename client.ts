import { App } from "@slack/bolt";
import { WebClient } from "@slack/web-api";

export const kitty_app = new App({
    token: process.env.KITTY_SLACK_TOKEN,
    appToken: process.env.KITTY_SLACK_APP_TOKEN,
    socketMode: true,
});

export const kitty_client = new WebClient(process.env.KITTY_SLACK_USER_TOKEN);

export const cat_app = new App({
    token:process.env.CAT_SLACK_TOKEN,
    appToken: process.env.CAT_SLACK_APP_TOKEN,
    socketMode: true,
});

export const cat_client = new WebClient(process.env.CAT_SLACK_USER_TOKEN);