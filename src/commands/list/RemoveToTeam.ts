import BaseCommands from "../BaseCommands";
import {
    ChatInputCommandInteraction, GuildMember,
    SlashCommandBuilder,
    SlashCommandMentionableOption,
    SlashCommandStringOption
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
        let mention = command.options.getMentionable("member");
        if (mention instanceof GuildMember){
            let result = await UserModel.findOne({discordId: mention.user.id})
            if (!result){
                await command.reply({embeds: [errorEmbed("l'utilisateur mentionné ne fais pas partis de la team.")]})
            }else {
                result.delete();
                await command.reply({embeds: [successEmbed("L'utilisateur mentionné ne fais plus à présent partis de la team.")]})
            }
        }
    }


}