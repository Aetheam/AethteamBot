import {BaseEvent, EventName} from "../BaseEvent";
import {Index} from "../../index";
import {teamUpdate} from "../../api/task";

export default class Ready extends BaseEvent{
    readonly name: EventName = "ready";
    constructor() {
        super();

    }

    public once = true;
    async execute(): Promise<void> {
        await Index.instance.CommandsLoader.register()
        await teamUpdate();

    }

}