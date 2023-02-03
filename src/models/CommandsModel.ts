import mongoose, {model, Schema} from "mongoose";

interface CommandsModel {
    clientId: string,
    sellerId: string,
    price: mongoose.Types.Decimal128
    sellerConfirm: boolean
    clientConfirm: boolean
}
const CommandsShema = new Schema<CommandsModel>({
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
    }
})
export default model<CommandsModel>("commandes", CommandsShema)