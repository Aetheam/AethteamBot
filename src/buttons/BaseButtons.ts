import {ButtonInteraction} from "discord.js";

export default abstract class BaseButtons{

    public readonly buttonId: string = "";
    public abstract buttonExecute(button: ButtonInteraction): Promise<void>;
}