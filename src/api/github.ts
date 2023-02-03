import {getStringEnv} from "../utils/EnvVariable";
import {messageLogger} from "../utils/BaseEmbed";
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
            //JSON.stringify(parse,null, 2)
        }catch (error){
            await messageLogger(JSON.stringify(error))
        }
    }catch (e){
        if (e instanceof TypeError){
            await messageLogger(e.toString())
        }
    }
}