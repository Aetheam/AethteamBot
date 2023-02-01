import 'dotenv/config';

export default interface EnvVariable {
    TOKEN: string,
    GITHUB_TOKEN: string,
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    GUILD_ID: string,
    MONGO_URL: string
}
export const getStringEnv = (name: string): string => {
    const env = process.env[name];
    if (!env) throw new Error("la variable " + name + " n'est pas définie");
    return env;
}