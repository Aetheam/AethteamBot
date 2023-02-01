import {ButtonBuilder, Collection} from "discord.js";
import BaseButtons from "./BaseButtons";
import {lstatSync, readdirSync} from "fs";
import BaseCommands from "../commands/BaseCommands";
import {Index} from "../index";

export default class ButtonsLoader {

    public readonly button: Collection<string, BaseButtons> = new Collection();
    constructor() {
        this.loader(`${__dirname}/list`).then(() => this.listener() )
    }

    async loader(path: string){
        const files = readdirSync(path);
        for (const file of files) {
            if (lstatSync(path + "/" + file).isDirectory()){
                await this.loader(path + "/" + file)
            }else {
                const importFile = await import(path + "\\" + file);
                const buttons: BaseButtons =  new importFile.default();
                this.button.set(buttons.buttonId, buttons);
            }
        }
        console.log(this.button)
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