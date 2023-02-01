import {
    ActionRowBuilder,
    ButtonBuilder, ButtonInteraction,
    ButtonStyle,
    Collection,
    EmbedBuilder,
    Guild, GuildMember,
    Message, PermissionsBitField,
    TextChannel
} from "discord.js";
import {Index} from "../index";
import  config from "../config.json";
import {EmojiList} from "./EmojiList";
import {getStringEnv} from "./EnvVariable";

export const ticketMessage = async () => {
    const guild: Guild = await Index.instance.getGuild()
    const channel: TextChannel = <TextChannel>guild.channels.cache.get(config.ticket.channel);
    const messages: Collection<string, Message<true>> = await channel.messages.fetch()
    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle("Ticket")
        .setThumbnail("https://cdn.discordapp.com/icons/915046808009441323/4b6015718f87bfdd9041ac0b7c8b5032.png?size=1024")
        .setDescription("Afin de pouvoir correctement répondre à votre demande, nous vous invitons à ouvrir un ticket.\n\n Nous vous rappellons que toute demande devras être le plus possible développer , ainsi que votre tranche de budget.\n\npour toute demande hésitez pas non plus à demander dans le chat")
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('ticket:open')
                .setLabel('Ouvrir un ticket')
                .setEmoji("<:open_tickets:1069310229206007920> ")
                .setStyle(ButtonStyle.Primary),
        );

    if (messages.size === 0){
        await channel.send({embeds: [embed], components: [row]})
    }else if(messages.size > 1) {
        messages.map(message => {
            message.delete()
        })
        await channel.send({embeds: [embed] , components: [row]})
    }else if (messages.size === 1){
        const message = messages.first()
        if (message instanceof Message){
            if (message.author.id === "1068016572200931358") {
                await message.edit({embeds: [embed], components: [row]})
            }
        }
    }
}

export const createTicket = async function (guildMember: GuildMember, interaction: ButtonInteraction) {
    const guild = await Index.instance.getGuild();
    const embeds: EmbedBuilder = new EmbedBuilder()
        .setTitle("Ticket de " + guildMember.user.username)
        .setTimestamp(new Date())
        .setDescription("Bienvenue\n" +
            "afin de facilitée la prise de votre commande, veuillez décrire au mieux votre demande.\n" +
            "elle sera prise en charge rapidement. \n\n" +
            "si cela concerne le recrutement, merci de mentionner <@883693434693619732> pour avoir plus d'informations.")
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('ticket:close')
                .setLabel('fermer le ticket')
                .setEmoji(EmojiList.base_ticket)
                .setStyle(ButtonStyle.Danger),
        );
    const roles = await config.ticket.open.access_roles.map(role => {
        return {
            id: role,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages,PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.ManageMessages]
        }
    })
    guild.channels.create({
        name: "Ticket de " + guildMember.user.username,
        parent: config.ticket.open.category,
        permissionOverwrites: [
            {
                id: <string> getStringEnv("GUILD_ID"),
                deny: [PermissionsBitField.Flags.ViewChannel,PermissionsBitField.Flags.SendMessages]
            },
            {
                id: guildMember.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages,PermissionsBitField.Flags.AttachFiles]
            },
            ...roles
        ]

    }).then((r) => {
        r.send({embeds: [embeds], components: [row]})
        interaction.reply({content: "ton ticket à bien été ouvert regarde <#" + r.id  + ">", ephemeral: true})
    })

}