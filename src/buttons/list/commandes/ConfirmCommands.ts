import BaseButtons from "../../BaseButtons";
import {ButtonInteraction, GuildMember, TextChannel, User, Webhook} from "discord.js";
import CommandsModel from "../../../models/CommandsModel";
import internal from "stream";
import {promises} from "dns";
import {createRepository} from "../../../api/github";

export default class ConfirmCommands extends BaseButtons{
    buttonId= "commandes:confirmCommands"
    async buttonExecute(button: ButtonInteraction): Promise<void> {
        const channel = <TextChannel>button.channel;
        const result = await CommandsModel.findOne({channelId: channel.id})
        if (result) {
            const user = <User>button.user;
            if (result.clientId === user.id){
                if (result.clientConfirm) {
                    await button.reply({content: "Vous avez déja confirmer la commande", ephemeral: true})
                    return;
                }else {
                    result.clientConfirm = true;
                    await result.save();
                    await button.reply({content: "Vous avez confirmer la commande", ephemeral: true})
                }
            }
            if (result.sellerId === user.id){
                if (result.sellerConfirm) {
                    await button.reply({content: "Vous avez déja confirmer la commande", ephemeral: true})
                    return;
                }else {
                    result.sellerConfirm = true;
                    await result.save();
                    await button.reply({content: "Vous avez confirmer la commande", ephemeral: true})
                }
            }
            if (result.sellerConfirm && result.clientConfirm) {
              channel.createWebhook({
                    name: 'suivis',
                    avatar: 'https://cdn.discordapp.com/icons/915046808009441323/4b6015718f87bfdd9041ac0b7c8b5032.png?size=1024',
                }).then(w => {
                    result.webhookUrl = w.url;
                    result.save()
                  createRepository(result.commandsName, "test", w.url)
                })
            }
        } else {
            await button.reply({content: "Aucune commande trouvée veuiller refaire", ephemeral: true})
        }

    }
}