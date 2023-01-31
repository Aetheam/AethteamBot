import 'dotenv/config';

export const getStringEnv = (name: string): string => {
    let env = process.env[name];
    if (!env) throw new Error("la variable " + name + " n'est pas définie");
    return env;
}