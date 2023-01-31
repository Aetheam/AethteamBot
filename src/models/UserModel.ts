import {Schema, model} from "mongoose";
interface UserInterface  {
    discordId: string;
    githubName: string;
    username: string;
    userJob: string[];
    paypal: string;
    commandCount: number;
    commandInProgress: number;
}
const UserSchema = new Schema<UserInterface>({
    discordId: {required: true, type: "string"},
    username: {required: true, type: "string"},
    githubName: {required: true, type: "string"},
    userJob: [String],
    paypal: {type: "string", default: null},
    commandCount: {type: "number", default: 0},
    commandInProgress: {type: "number", default: 0},
})
export default model<UserInterface>("user", UserSchema);