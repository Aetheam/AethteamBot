import UserModel from "../models/UserModel";
import {Collection, EmbedBuilder, Message, TextChannel} from "discord.js";
import {Index} from "../index";
import {EmojiList} from "../utils/EmojiList";

export const teamUpdate = async () => {
    const guild = await Index.instance.getGuild()
    const channel: TextChannel = <TextChannel>guild.channels.cache.get("956859228495171614");
    setInterval(async () => {
        const messages: Collection<string, Message<true>> = await channel.messages.fetch()

        let discordJsJob = "";
        let phpPocketmineJob = "";
        let phpApiJob = "";
        let jsApiJob = "";
        let mapMakerJob = "";
        let packMakerJob = "";
        const result = await UserModel.find();
        result.map(user => {
            user.userJob.map(jobs => {
                switch (jobs) {
                    case "PHP-POCKETMINE":
                        phpPocketmineJob +=  EmojiList.multicolor_arrow + user.username + "\n"
                        break;
                    case "PHP-API":
                        phpApiJob += EmojiList.multicolor_arrow +  user.username + "\n"
                        break;
                    case "DISCORD-JS":
                        discordJsJob += EmojiList.multicolor_arrow + user.username + "\n"
                        break;
                    case "PACK-MAKER":
                        packMakerJob += EmojiList.multicolor_arrow + user.username + "\n"
                        break;
                    case "MAP-MAKER":
                        mapMakerJob += EmojiList.multicolor_arrow + user.username + "\n"
                        break;
                    case "JS-API":
                        jsApiJob += EmojiList.multicolor_arrow + user.username + "\n"
                }
            })
        })
        const embed = new EmbedBuilder()
            .setTitle("Membres de la Aethteam")
            .setDescription("Voicis les membres de la Aethteam")
            .addFields(
                {name: EmojiList.php_logo+"Pocketmine", value: phpPocketmineJob, inline: true},
                {name: EmojiList.php_api + "php-api", value: phpApiJob ==="" ? "-------" : phpApiJob, inline: true},
                {name: EmojiList.js_api+ "js-api", value: jsApiJob ==="" ? "-------" : jsApiJob, inline: true},
                {name: EmojiList.discord_js +"discord.js", value: discordJsJob ==="" ? "-------" : discordJsJob, inline: true},
                {name: EmojiList.map_maker + "map maker", value: mapMakerJob ==="" ? "-------" : mapMakerJob, inline: true},
                {name: EmojiList.pack_maker + "pack maker", value: packMakerJob ==="" ? "-------" : packMakerJob, inline: true}
            )
        if (messages.size === 0){
            await channel.send({embeds: [embed]})
        }else if(messages.size > 1) {
            messages.map(message => {
                message.delete()
            })
            await channel.send({embeds: [embed]})
        }else if (messages.size === 1){
            const message = messages.first()
            if (message instanceof Message){
                if (message.author.id === "1068016572200931358") {
                    await message.edit({embeds: [embed]})
                }
            }
        }
    }, 10000);

}