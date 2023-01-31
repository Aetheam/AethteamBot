import {ButtonInteraction} from "discord.js";

export default abstract class BaseButtons{
    public readonly containButton: boolean = false;

    public readonly buttonId: string = "";
    public abstract buttonExecute(button: ButtonInteraction): Promise<void>;
}