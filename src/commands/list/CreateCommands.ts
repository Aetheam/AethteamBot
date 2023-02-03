import BaseCommands from "../BaseCommands";
import {
    ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder, GuildMember,
    SlashCommandBuilder, SlashCommandIntegerOption,
    SlashCommandMentionableOption, SlashCommandStringOption, TextChannel
} from "discord.js";
import {EmojiList} from "../../utils/EmojiList";
import CommandsModel from "../../models/CommandsModel";

export default class CreateCommands extends BaseCommands{
    readonly slashCommand = new SlashCommandBuilder()
        .setName("create-commands")
        .setDescription("Commencer une commande")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("client")
            .setDescription("pseudo du client")
                .setRequired(true))
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("vendeur")
            .setDescription("pseudo du vendeur")
            .setRequired(true))
        .addStringOption(new SlashCommandStringOption()
            .setName("command-description")
            .setDescription("mettez ici la description de la commande")
            .setRequired(true))
        .addIntegerOption(new SlashCommandIntegerOption()
            .setName("prix")
            .setDescription("Prix de la commande")
            .setRequired(true))

    async execute(command: ChatInputCommandInteraction): Promise<void> {
        const clientMention  = command.options.getMentionable("client")
        const sellerMention = command.options.getMentionable("vendeur")
        const price = command.options.getInteger("prix")
        const commandDescription = command.options.getString("command-description")
        const channel = <TextChannel>command.channel
        const embed = new EmbedBuilder()
            .setTitle("Création d'une nouvelle commande")
            .setDescription(`Prix: ${price} <:dollard:1070865328734736394>  \n
                 Vendeur: ${sellerMention} \n
                 Client: ${clientMention} \n
                 Commande: ${commandDescription} \n`)
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('commandes:confirmCommands')
                    .setLabel('confirmer la commande')
                    .setEmoji(EmojiList.gif_green_certif)
                    .setStyle(ButtonStyle.Danger),
            );
        if (clientMention instanceof GuildMember && sellerMention instanceof GuildMember){
            await new CommandsModel({
                channelId: channel.id,
                clientId: clientMention.user.id,
                sellerId: sellerMention.user.id,
                price: price
            }).save()
            await command.reply({embeds: [embed], components: [row]})
        }

    }

}