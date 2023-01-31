import {ClientEvents} from "discord.js";

export type EventName = keyof ClientEvents;
export abstract class BaseEvent{

    public abstract readonly name: EventName;

    public readonly once: boolean = false;

    public abstract execute(...args: any[]): void;
}