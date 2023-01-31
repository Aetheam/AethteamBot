import {Collection} from "discord.js";
import BaseCommands from "./BaseCommands";
import {readdirSync, readFileSync} from "fs";
import {Index} from "../index"

export default class CommandsLoader{
    public readonly commands: Collection<string, BaseCommands> = new Collection();


    constructor() {
        this.loader().then(() => this.listener());
    }
    async loader(): Promise<void>{
        const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of files) {
            let importFile = await import("./list/" + file);
            let command: BaseCommands =  new importFile.default();
            this.commands.set(command.name, command);
        }
    }

    async listener(): Promise<void>{
        Index.instance.on("interactionCreate", interaction => {
            if (interaction.isChatInputCommand()) {
                let command = this.commands.get(interaction.commandName);
                if (command) command.execute(interaction);
            }else if (interaction.isButton()){

            }
        })
    }
    async register(){
        await (await Index.instance.getGuild()).commands.set(
            this.commands.map(command => command.slashCommand.toJSON())
        );
        console.log("slash commands load")
    }
}