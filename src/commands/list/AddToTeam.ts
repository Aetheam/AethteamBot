import BaseCommands from "../BaseCommands";
import {
    ApplicationCommandOptionWithChoicesAndAutocompleteMixin,
    ChatInputCommandInteraction, Colors, EmbedBuilder, GuildMember, messageLink,
    SlashCommandBuilder, SlashCommandMentionableOption,
    SlashCommandStringOption,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";
import UserModel from "../../models/UserModel";
export default class AddToTeam extends BaseCommands{

    public readonly slashCommand = new SlashCommandBuilder()
        .setName("add_to_team")
        .setDescription("Ajouter un utilisateur à la team")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("membre")
            .setDescription("Utilisateur à ajouter")
            .setRequired(true))
        .addStringOption(new SlashCommandStringOption()
            .setName("github_name")
            .setDescription("Github de la personne ajoutée")
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
                .setRequired(true)
        })
    async execute(command: ChatInputCommandInteraction): Promise<void> {
        let member = command.options.getMentionable("membre");
        let githubName: string = <string>command.options.getString("github_name");
        let job: string = <string>command.options.getString("job")
        if (member instanceof GuildMember) {
            let userId = member.user.id;
            let mongoUser = await UserModel.findOne({discordId: userId});
            if (mongoUser){
                await command.reply(member.user.username.toString() + " est déja enregistrer sur la db\nFaites /update_user_team pour update l'utilisateur en cas de besoin")
            }else {
                let newUser = new UserModel({
                    discordId: userId.toString(),
                    githubName: githubName.toString(),
                    userJob: [job.toString()],
                    username: member.user.username.toString()
                })
                await newUser.save()
                let embed = new EmbedBuilder()
                    .setTitle("Nouveau Membre")
                    .setColor(Colors.Blurple)
                    .addFields(
                        {name: "username", value: member.user.username, inline: true},
                        {name: "Github", value: "["+githubName.toString()+"](https://github.com/"+githubName.toString() + ")", inline: true},
                        {name: "Job", value: job.toString(), inline: true},
                    )
                await command.reply({embeds: [embed]})
            }
        }
    }
}