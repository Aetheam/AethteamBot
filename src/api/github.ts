import {getStringEnv} from "../utils/EnvVariable";
import {json} from "stream/consumers";

const baseUrl: string = "https://api.github.com/orgs".toString();
const organization: string = "Aetheam".toString()
export const createRepository = async (name: string, description: string, webhook: string) =>{
    const newUrl = `${baseUrl}/${organization}/repos`.toString()
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
        console.log(await request.json())
    }catch (e){
        console.log(e)
    }


}