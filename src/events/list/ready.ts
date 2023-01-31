import {BaseEvent, EventName} from "../BaseEvent";
import {ClientEvents, EmbedBuilder, TextChannel} from "discord.js";
import {Index} from "../../index";
import UserModel from "../../models/UserModel";
import {teamUpdate} from "../../api/task";

export default class Ready extends BaseEvent{
    readonly name: EventName = "ready";
    constructor() {
        super();

    }

    public once: boolean = true;
    async execute(): Promise<void> {
        await Index.instance.CommandsLoader.register()
        await teamUpdate();

    }

}