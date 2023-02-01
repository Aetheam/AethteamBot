import mongoose, {model, Schema} from "mongoose";

interface CommandsModel {
    clientId: string,
    sellerId: string,
    price: mongoose.Types.Decimal128
    end: Date
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
    end: {
        type: "date",
        default: null
    }
})
export default model<CommandsModel>("commandes", CommandsShema)