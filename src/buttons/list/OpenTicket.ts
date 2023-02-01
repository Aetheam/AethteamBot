import BaseButtons from "../BaseButtons";
import {ButtonInteraction} from "discord.js";

export default class OpenTicket extends BaseButtons{
    public buttonId = "ticket:open"

    async buttonExecute(button: ButtonInteraction): Promise<void> {
        await console.log(button)
    }

}