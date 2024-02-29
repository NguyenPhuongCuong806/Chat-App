import PrivateMessange from '../modules/privateMessange'
import User from '../modules/user';
import Group from '../modules/group'
import GroupMessange from '../modules/groupMessange';

const sendmessange = async (data) => {
    try {
        let sender = await User.findOne({ phonenumber: data.phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: data.phonereceiver }).exec();
        if (sender && receiver && data.content) {
            const chat = new PrivateMessange({ sender: sender, receiver: receiver, content: data.content })
            await chat.save();
            return {
                EM: "send messange is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "send messange is error!",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: []
        }
    }
}

const getAllChatPrivate = async (data) => {
    try {
        let sender = await User.findOne({ phonenumber: data.phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: data.phonereceiver }).exec();
        if (sender && receiver) {

            const totalDocuments = await PrivateMessange.countDocuments(
                {
                    $or: [{ sender: sender._id, receiver: receiver._id }, { sender: receiver._id, receiver: sender._id }]
                }
            );
            const remainingDocuments = Math.max(0, totalDocuments - data.skip);
            const limit = Math.min(6, remainingDocuments);

            let test = await PrivateMessange.find({
                $or: [{ sender: sender._id, receiver: receiver._id }, { sender: receiver._id, receiver: sender._id }]
            })
                .sort({ createdAt: 'desc' })
                .limit(limit)
                .skip(data.skip)
                .exec();
            const reversedGroup = test.reverse();
            return {
                EM: "get all messange is success!",
                EC: 0,
                DT: reversedGroup
            }
        } else {
            return {
                EM: "get all messange is error!",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: []
        }
    }
}

const getAllChat = async (data) => {
    try {
        let sender = await User.findOne({ phonenumber: data.phonesender }).exec();
        if (sender) {
            let test = await PrivateMessange.find({
                $or: [{
                    sender: sender._id
                }, { receiver: sender._id }]
            }).sort({ createdAt: 'desc' })
                .limit(5)
                .exec();
            return {
                EM: "get all messange is success!",
                EC: 0,
                DT: test
            }
        } else {
            return {
                EM: "get all messange is error!",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: []
        }
    }
}

const sendmessangeingroup = async (data) => {
    try {
        let sender = await User.findOne({ phonenumber: data.phonesender }).exec();
        let group = await Group.findById(data.groupId).exec();
        if (sender && group && data.content) {
            const chat = new GroupMessange({ sender: sender, group: group, content: data.content })
            await chat.save();
            return {
                EM: "send messange is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "send messange is error!",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: []
        }
    }
}

const getAllChatingroup = async () => {
    try {
        let test = await GroupMessange.find({}).sort({ createdAt: 'desc' })
            .limit(5)
            .exec();
        return {
            EM: "get all messange is success!",
            EC: 0,
            DT: test
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    sendmessange, getAllChatPrivate, getAllChat, sendmessangeingroup, getAllChatingroup
}