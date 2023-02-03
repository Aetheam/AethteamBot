import {Colors, EmbedBuilder, TextChannel} from "discord.js";
import {PipelineStage} from "mongoose";
import {Index} from "../index";


export const errorEmbed = async (message: string): Promise<EmbedBuilder> => {

    return new EmbedBuilder()
        .setTitle("Erreur")
        .setDescription(message)
        .setTimestamp(new Date())
        .setColor(Colors.Red)
}
export const messageLogger = async (message: string): Promise<void> => {
    const guild = await Index.instance.getGuild();
    const channel = <TextChannel>guild.channels.cache.get("1071161023354126359")

    await channel.send({content: "```json\n" + message + "\n```"})
}
export const successEmbed = (message: string): EmbedBuilder => {
    return new EmbedBuilder()
        .setTitle("Success")
        .setColor(Colors.Green)
        .setDescription(message)
}
export const updateEmbed = (message: string): EmbedBuilder => {
    return new EmbedBuilder()
        .setTitle("Success")
        .setColor(Colors.Green)
        .setDescription(message)
}
export const updateProfileEmbed = (username: string, job: string[], githubName: string, paypal: string | null, commandCount: number, commandsInProgress: number): EmbedBuilder => {
    let fields = [
        {name:"username", value: `${username}`, inline: true},
        {name: "job", value: `${job}` ,inline: true},
        {name:"github", value: `${githubName}`,  inline: true}
    ]
    if (paypal === null){
        fields.push({name:"<:paypal:1068903140952383518> paypal", value: `Aucun paypal renseigné`,  inline: true})
    }else {
        fields.push({name:"<:paypal:1068903140952383518> paypal", value: `${paypal}`,  inline: true})
    }
    fields.push({name:"Commandes Terminée ", value: `${commandCount}`, inline: true})
    fields.push({name:"Commandes en cours ", value: `${commandsInProgress}`,  inline: true})
    return new EmbedBuilder()
        .setTitle("<a:update:1068902828074086450>  Success")
        .setColor(Colors.Green)
        .addFields(...fields)
}