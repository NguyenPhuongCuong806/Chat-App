import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    is_online: {
        type: String,
        default: '0'
    },
    listfriend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    listaddfriend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    listsendaddfriend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User