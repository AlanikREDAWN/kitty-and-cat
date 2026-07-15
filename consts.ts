import { resolve } from "bun";

export const kitty_cat_playground = 'C0BFW6CB109';
export const greetings = ["hewo", "hi", "hello", "hey", "greetings", "hellooo"];
export const cat_noises = ["meow", "mrow", "purr", "mrrr", "mew", "mrrp"];

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const kitty_greetings = ["hewo", "hi", "hello", ":kitty-wave:", "hey"];

export const cat_greetings = ["hi", "hello", "hey"];