import BaseCommands from "../BaseCommands";
import {ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, SlashCommandMentionableOption} from "discord.js";
import userModel from "../../models/UserModel";
import {errorEmbed, successEmbed} from "../../utils/BaseEmbed";

export default class AddJobToUserTeam extends BaseCommands {
    readonly slashCommand = new SlashCommandBuilder()
        .setName("add-job-to-user-team")
        .setDescription("ajouter un nouveau job ")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("membre")
            .setDescription("Utilisateur à ajouter")
            .setRequired(true))
        .addStringOption(options => {
            return options
                .setName("job")
                .setDescription("Ajouter le job")
                .addChoices(
                    {name: "PHP-pocketmine", value: "PHP-POCKETMINE"},
                    {name: "PHP-API", value: "PHP-API"},
                    {name: "Discord-Js", value: "DISCORD-JS"},
                    {name: "Pack-maker", value: "PACK-MAKER"},
                    {name: "Map-maker", value: "MAP-MAKER"},
                    {name: "Js-api", value: "JS-API"}
                )
                .setRequired(true)})
    async execute(command: ChatInputCommandInteraction): Promise<void> {
       const job: string = <string>command.options.getString("job")
        const mention = command.options.getMentionable("membre")
        if (mention instanceof GuildMember){
            const result = await userModel.findOne({discordId: mention.user.id});
            if (!result){
                await command.reply({embeds: [await errorEmbed("l'utilisateur mentionné ne fais pas partis de la team")]})
                return;
            }
            let verif = true;
            result.userJob.map(async jobs => {
                if (jobs === job) {
                    verif = false;
                    await command.reply({embeds: [await errorEmbed("Le job spécifié est déja sur cette personne")]})
                    return;
                }
            })
            if (verif){
                result.userJob.push(job)
                result.save();
                await command.reply({embeds: [successEmbed("un nouveau job à été ajouté")]})
            }
        }
    }

}