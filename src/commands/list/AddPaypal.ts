import BaseCommands from "../BaseCommands";
import {
    ChatInputCommandInteraction,
    GuildMember,
    SlashCommandBuilder,
    SlashCommandMentionableOption,
    SlashCommandStringOption
} from "discord.js";
import UserModel from "../../models/UserModel";
import {errorEmbed, successEmbed, updateEmbed, updateProfileEmbed} from "../../utils/BaseEmbed";

export default class AddPaypal extends BaseCommands{
    public readonly slashCommand = new SlashCommandBuilder()
        .setName("add_paypal")
        .setDescription("Ajoute ton paypal à ton profil")
        .addStringOption(new SlashCommandStringOption()
            .setRequired(true)
            .setName("paypal")
            .setDescription("url paypal"))
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("membre")
            .setDescription("Utilisateur à ajouter")
            .setRequired(true))
    async execute(command: ChatInputCommandInteraction): Promise<void>{
        let member = command.options.getMentionable("membre");
        let paypal = <string>command.options.getString("paypal");
        if (member instanceof GuildMember) {
            let userId = member.user.id;
            let result = await UserModel.findOne({discordId: userId});
            if (!result) {
                await command.reply({embeds: [errorEmbed("L'utilisateur n'est pas enregistrer. merci de l'enregister en faisant la commande /add_to_team")]})
            } else {
                result.paypal = paypal;
                await result.save();
                await command.reply({embeds: [updateProfileEmbed(member.user.username, result.userJob, result.githubName, result.paypal, result.commandCount, result.commandInProgress)]})
            }
        }
    }

}