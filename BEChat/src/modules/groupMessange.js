import mongoose from "mongoose";

const GroupMessangeSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    content: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

const GroupMessange = mongoose.model("Group_Messange", GroupMessangeSchema);

export default GroupMessange