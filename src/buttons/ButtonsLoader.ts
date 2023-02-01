import {ButtonBuilder, Collection} from "discord.js";
import BaseButtons from "./BaseButtons";
import {readdirSync} from "fs";
import BaseCommands from "../commands/BaseCommands";
import {Index} from "../index";

export default class ButtonsLoader {

    public readonly button: Collection<string, BaseButtons> = new Collection();
    constructor() {
        this.loader().then(() => this.listener() )
    }

    async loader(){
        const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of files) {
            const importFile = await import("./list/" + file);
            const buttons: BaseButtons =  new importFile.default();
            this.button.set(buttons.buttonId, buttons);
        }
    }
    async listener(){
        Index.instance.on("interactionCreate", interaction => {
            if (interaction.isButton()) {
                const command = this.button.get(interaction.customId);
                if (command) command.buttonExecute(interaction);
            }
        })
    }

}