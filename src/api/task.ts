import UserModel from "../models/UserModel";
import {EmbedBuilder, Message, TextChannel} from "discord.js";
import {Index} from "../index";

export const teamUpdate = async () => {
    const guild = await Index.instance.getGuild()
    const channel: TextChannel = <TextChannel>guild.channels.cache.get("956859228495171614");
    setInterval(async () => {
        let messages = await channel.messages.fetch()
        let discordJsJob: string = "";
        let phpPocketmineJob: string = "";
        let phpApiJob: string = "";
        let jsApiJob: string = "";
        let mapMakerJob: string = "";
        let packMakerJob: string = "";
        let result = await UserModel.find();
        result.map(user => {
            user.userJob.map(jobs => {
                switch (jobs) {
                    case "PHP-POCKETMINE":
                        phpPocketmineJob += user.username + "\n"
                        break;
                    case "PHP-API":
                        phpApiJob += user.username + "\n"
                        break;
                    case "DISCORD-JS":
                        discordJsJob += user.username + "\n"
                        break;
                    case "PACK-MAKER":
                        packMakerJob += user.username + "\n"
                        break;
                    case "MAP-MAKER":
                        mapMakerJob += user.username + "\n"
                        break;
                    case "JS-API":
                        jsApiJob += user.username + "\n"
                }
            })
        })
        let embed = new EmbedBuilder()
            .setTitle("Membres de la Aethteam")
            .setDescription("Voicis les membres de la Aethteam")
            .addFields(
                {name: "php-Pocketmine", value: phpPocketmineJob, inline: true},
                {name: "php-pocketmine2", value: phpPocketmineJob, inline: true}
            )
        if (messages.size === 0){
            await channel.send({embeds: [embed]})
        }else if(messages.size > 1) {
            messages.map(message => {
                message.delete()
            })
            await channel.send({embeds: [embed]})
        }else if (messages.size === 1){
            let message = messages.first()
            if (message instanceof Message){
                if (message.author.id === "1068016572200931358") {
                    let messageId = message.id;
                    await message.edit({embeds: [embed]})
                }else {

                }
            }
        }
        console.log("reset")
    }, 4000)

}