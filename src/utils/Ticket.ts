import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Collection,
    EmbedBuilder,
    Guild,
    Message,
    TextChannel
} from "discord.js";
import {Index} from "../index";
import  config from "../config.json";

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