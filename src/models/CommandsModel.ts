import mongoose, {model, Schema} from "mongoose";

interface CommandsModel {
    channelId: string,
    clientId: string,
    sellerId: string,
    price: mongoose.Types.Decimal128
    sellerConfirm: boolean
    clientConfirm: boolean,
    webhookUrl: string,
    commandsName:string
    commandsDescription:string
}
const CommandsShema = new Schema<CommandsModel>({
    channelId:{
        type: "string",
        required: true
    },
    clientId: {
        type: "string",
        required: true
    },
    sellerId:{
        type: "string",
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    sellerConfirm: {
        type: "boolean",
        default: false
    },
    clientConfirm: {
        type: "boolean",
        default: false
    },
    webhookUrl:{
        type: "string",
        default: null
    },
    commandsName: {
        type: "string",
        required: true
    },
    commandsDescription: {
        type: "string",
        required: true
    }
})
export default model<CommandsModel>("commandes", CommandsShema)