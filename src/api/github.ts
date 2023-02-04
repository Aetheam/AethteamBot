import {getStringEnv} from "../utils/EnvVariable";
import {messageLogger} from "../utils/BaseEmbed";
import CommandsModel from "../models/CommandsModel";
import UserModel from "../models/UserModel";
const baseUrl: string = "https://api.github.com".toString();
const organization: string = "Aetheam".toString()
export const createRepository = async (name: string, description: string, webhook: string, channelId: string) =>{
    const newUrl = `${baseUrl}/orgs/${organization}/repos`.toString()
    try{
        const request = await fetch(newUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
                'authorization': 'Bearer ' + getStringEnv("GITHUB_TOKEN"),
                'content-type': 'application/json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                private: true
            })
        })
        const resultJson = await request.json()
        try {
            await fetch(baseUrl + `/repos/${resultJson.full_name}/hooks`, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    'authorization': 'Bearer ' + getStringEnv("GITHUB_TOKEN"),
                    'content-type': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                method: "POST",
                body: JSON.stringify({
                    "name": "web",
                    "active":true,
                    "events":["push","pull_request"],
                    "config":{
                        "url": webhook + "/github",
                        "content_type":"json",
                        "insecure_ssl":"0"}
                })
            })
            try{
                const db = await CommandsModel.findOne({channelId: channelId});
                if (db){
                    const userProfil = await UserModel.findOne({discordId: db.sellerId});
                    if (userProfil){
                        const githubName = userProfil.githubName;
                        await fetch(baseUrl + `repos/${resultJson.full_name}/collaborators/${githubName}`, {
                            headers: {
                                "Accept": "application/vnd.github+json",
                                'authorization': 'Bearer ' + getStringEnv("GITHUB_TOKEN"),
                                'content-type': 'application/json',
                                'X-GitHub-Api-Version': '2022-11-28'
                            },
                            body: JSON.stringify({
                                permission: "admin"
                            })
                        })
                    }else {
                        new Error("aucune donnée n'as été trouvé pour le channel. merci de vérifier le code ")
                    }
                }else {
                    new Error("aucune donnée n'as été trouvé pour le channel. merci de vérifier le code ")
                }
            }catch (error){
                await messageLogger(JSON.stringify(error,null, 2))
            }
            //JSON.stringify(parse,null, 2)
        }catch (error){
            await messageLogger(JSON.stringify(error,null, 2))
        }
    }catch (e){
        if (e instanceof TypeError){
            await messageLogger(JSON.stringify(e,null, 2))
        }
    }
}