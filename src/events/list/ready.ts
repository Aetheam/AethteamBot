import {BaseEvent, EventName} from "../BaseEvent";
import {Index} from "../../index";
import {teamUpdate} from "../../api/task";
import {ticketMessage} from "../../utils/Ticket";
import {getStringEnv} from "../../utils/EnvVariable";

export default class Ready extends BaseEvent{
    readonly name: EventName = "ready";
    constructor() {
        super();
    }

    public once = true;
    async execute(): Promise<void> {
        await Index.instance.CommandsLoader.register()
        await teamUpdate();
        await ticketMessage();
        /*
        const result =  await fetch("https://api.github.com/orgs/Aetheam/repos", {
            headers: {
                'authorization': 'Bearer ' + getStringEnv("GITHUB_TOKEN"),
                'content-type': 'application/json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
         */


    }

}