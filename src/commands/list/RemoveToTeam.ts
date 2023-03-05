import BaseCommands from "../BaseCommands";
import {
    ChatInputCommandInteraction, GuildMember,
    SlashCommandBuilder,
    SlashCommandMentionableOption
} from "discord.js";
import UserModel from "../../models/UserModel";
import {errorEmbed, successEmbed} from "../../utils/BaseEmbed";

export default class RemoveToTeam extends BaseCommands {
    public readonly slashCommand = new SlashCommandBuilder()
        .setName("remove_user_team")
        .setDescription("retirer la personne de la team")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("member")
            .setDescription("le nom du membre que vous souhaitez retirer"))

    async execute(command: ChatInputCommandInteraction) {
        const mention = command.options.getMentionable("member");
        if (mention instanceof GuildMember){
            const result = await UserModel.findOne({discordId: mention.user.id})
            if (!result){
                const embed = await errorEmbed("l'utilisateur mentionné ne fais pas partis de la team.")
                await command.reply({embeds: [embed]});
            }else {
                result.delete();
                const emb = successEmbed("L'utilisateur mentionné ne fais plus à présent partis de la team.");
                await command.reply({embeds: [emb]})
            }
        }
    }


}