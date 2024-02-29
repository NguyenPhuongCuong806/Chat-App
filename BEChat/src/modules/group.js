import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
},
    { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

export default Group