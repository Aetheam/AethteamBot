import BaseButtons from "../../BaseButtons";
import {ButtonInteraction, GuildMember} from "discord.js";
import {createTicket} from "../../../utils/Ticket";

export default class OpenTicket extends BaseButtons{
    public buttonId = "ticket:open"

    async buttonExecute(button: ButtonInteraction): Promise<void> {
        await createTicket(<GuildMember>button.member, button)
    }
}