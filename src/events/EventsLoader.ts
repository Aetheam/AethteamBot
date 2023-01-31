import {readdirSync} from "fs";
import {BaseEvent} from "./BaseEvent";
import {Index} from "../index";

export default class EventsLoader{
    constructor() {
        this.load()
    }
    private async load(){
        const files = readdirSync(`${__dirname}/list`).filter(file => file.endsWith(".ts") || file.endsWith(".js"))
        let i = 0;
        for (const file of files){
            let importFile = await import("./list/" + file);
            let event: BaseEvent = new importFile.default();
            Index.instance[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
            i++;
        }
        console.log(`${i} events registered`)
    }
}