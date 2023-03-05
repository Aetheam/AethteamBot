import UserModel from "../models/UserModel";
import {Collection, EmbedBuilder, GuildMember, Message, Role, TextChannel} from "discord.js";
import {Index} from "../index";
import {EmojiList} from "../utils/EmojiList";
import {errorEmbed, messageLogger} from "../utils/BaseEmbed";

export const teamUpdate = async () => {
    const guild = await Index.instance.getGuild()
    const channel: TextChannel = <TextChannel>guild.channels.cache.get("1071826436698144858");
    setInterval(async () => {
        const messages: Collection<string, Message<true>> = await channel.messages.fetch()
        await guild.members.fetch()
        const roles: string[] = ["956859176045404161", "956859174908723210","1075140197047615528"];
        for (const r of roles) {
            const role = guild.roles.cache.get(r);
            if (!role) {
                await messageLogger("Le rôle ayant comme id" + role + "n'est plus valide")
                return;
            }
        }
        const discordJsRole = <Role>guild.roles.cache.get("956859176045404161");
        const pocketmineRole = <Role>guild.roles.cache.get("956859174908723210");
        const jsApiRole = <Role>guild.roles.cache.get("1075140197047615528");

        const Jobfields = []

        const discordJsJob = discordJsRole.members.map((member: GuildMember) => {
            return member;
        })
        const pocketminejob = pocketmineRole.members.map((member: GuildMember) => {
            return member
        })

        const jsApiJob = jsApiRole.members.map((member: GuildMember) => {return member});
        
        let mapMakerJob = "";
        let packMakerJob = "";

        if (pocketminejob.length > 0) {
            Jobfields.push({
                name: EmojiList.php_logo + "pocketmine", value: pocketminejob.map(m => {
                    return EmojiList.multicolor_arrow + m.user.username
                }).join("\n"), inline: true
            })
        }
        if (discordJsJob.length > 0) {
            Jobfields.push({
                name: EmojiList.discord_js + "discord.js", value: discordJsJob.map(m => {
                    return EmojiList.multicolor_arrow + m.user.username
                }).join("\n"), inline: true
            })
        }
        if (jsApiJob.length > 0){
            Jobfields.push({
                name: EmojiList.js_api + "javascript API", value: jsApiJob.map(m => {
                    return EmojiList.multicolor_arrow + m.user.username
                }).join("\n"), inline: true
            })
        }

        const embed = new EmbedBuilder()
            .setTitle("Membres de la Aethteam")
            .setDescription("Voicis les membres de la Aethteam")
            .addFields(
                ...Jobfields,

            )
            .setTimestamp(new Date())
        /*
        {name: EmojiList.php_api + "php-api", value: phpApiJob === "" ? "-------" : phpApiJob, inline: true},
                {name: EmojiList.js_api + "js-api", value: jsApiJob === "" ? "-------" : jsApiJob, inline: true},
                {
                    name: EmojiList.map_maker + "map maker",
                    value: mapMakerJob === "" ? "-------" : mapMakerJob,
                    inline: true
                },
                {
                    name: EmojiList.pack_maker + "pack maker",
                    value: packMakerJob === "" ? "-------" : packMakerJob,
                    inline: true
                }
         */
        if (messages.size === 0) {
            await channel.send({embeds: [embed]})
        } else if (messages.size > 1) {
            messages.map(message => {
                message.delete()
            })
            await channel.send({embeds: [embed]})
        } else if (messages.size === 1) {
            const message = messages.first()
            if (message instanceof Message) {
                if (message.author.id === "1068016572200931358") {
                    await message.edit({embeds: [embed]})
                }
            }
        }
    }, 1000);

}