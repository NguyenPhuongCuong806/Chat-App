import mongoose from "mongoose";

const privateMessangeSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const PrivateMessange = mongoose.model("Private_Messange", privateMessangeSchema);

export default PrivateMessange