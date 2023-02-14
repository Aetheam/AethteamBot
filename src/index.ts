import {Client, GatewayIntentBits, Guild, Partials} from "discord.js";
import {getStringEnv} from "./utils/EnvVariable";
import * as mongoose from "mongoose";
import exp from "constants";
import CommandsLoader from "./commands/CommandsLoader";
import EventsLoader from "./events/EventsLoader";
import ButtonsLoader from "./buttons/ButtonsLoader";

export class Index extends Client {

    static instance: Index;
    public readonly CommandsLoader: CommandsLoader;
    public readonly EventsLoader: EventsLoader;
    public readonly ButtonsLoader: ButtonsLoader;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildBans
            ],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction]
        })
        Index.instance = this;
        try{
            mongoose.set('strictQuery', false);
            mongoose.connect(getStringEnv("MONGO_URL")).then(() => console.log("Connection à la base de donnée réussie"))
        }catch (Exception){
            console.log(Exception)
        }
        this.login(getStringEnv("TOKEN")).then(() => console.log("Le token est correct"))
        this.CommandsLoader = new CommandsLoader();
        this.EventsLoader = new EventsLoader();
        this.ButtonsLoader = new ButtonsLoader();
    }
    public async getGuild() : Promise<Guild> {
        return await this.guilds.fetch("915046808009441323");
    }
}
new Index();


