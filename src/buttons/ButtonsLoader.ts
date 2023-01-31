import {Collection} from "discord.js";
import BaseButtons from "./BaseButtons";
import {readdirSync} from "fs";

class ButtonsLoader {

    public readonly button: Collection<string, BaseButtons> = new Collection();
    constructor() {

    }

    async loader(){
        const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    }

}