import User from "../modules/user"

const sendfriendAdd = async (phonesender, phonereceiver) => {
    try {
        let sender = await User.findOne({ phonenumber: phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: phonereceiver }).exec();
        if (sender && receiver) {
            sender.listsendaddfriend = [...sender.listsendaddfriend, receiver]
            await sender.save()
            receiver.listaddfriend = [...receiver.listaddfriend, sender]
            await receiver.save()
            return {
                EM: "send addfriend is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "send addfriend is error!",
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

const cancelsendfriend = async (phonesender, phonereceiver) => {
    try {
        let sender = await User.findOne({ phonenumber: phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: phonereceiver }).exec();
        if (sender && receiver) {
            sender.listsendaddfriend = sender.listsendaddfriend.filter((item) => !item.equals(receiver._id))
            await sender.save()
            receiver.listaddfriend = receiver.listaddfriend.filter((item) => !item.equals(sender._id))
            await receiver.save()
            return {
                EM: "cancel send addfriend is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "cancel send addfriend is error!",
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

const cancelfriendbyreceiver = async (phonesender, phonereceiver) => {
    try {
        let sender = await User.findOne({ phonenumber: phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: phonereceiver }).exec();
        if (sender && receiver) {
            sender.listaddfriend = sender.listaddfriend.filter((item) => !item.equals(receiver._id))
            await sender.save()
            receiver.listsendaddfriend = receiver.listsendaddfriend.filter((item) => !item.equals(sender._id))
            await receiver.save()
            return {
                EM: "cancel send addfriend is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "cancel send addfriend is error!",
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

const confirmaddfriend = async (phonesender, phonereceiver) => {
    try {
        let sender = await User.findOne({ phonenumber: phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: phonereceiver }).exec();
        if (sender && receiver) {
            sender.listaddfriend = await sender.listaddfriend.filter((item) => !item.equals(receiver._id))
            sender.listfriend = await [...sender.listfriend, receiver]
            await sender.save()
            receiver.listsendaddfriend = await receiver.listsendaddfriend.filter((item) => !item.equals(sender._id))
            receiver.listfriend = await [...receiver.listfriend, sender]
            await receiver.save()
            return {
                EM: "cancel send addfriend is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "cancel send addfriend is error!",
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

const cancelmaddfriend = async (phonesender, phonereceiver) => {
    try {
        let sender = await User.findOne({ phonenumber: phonesender }).exec();
        let receiver = await User.findOne({ phonenumber: phonereceiver }).exec();
        if (sender && receiver) {
            sender.listfriend = await sender.listfriend.filter((item) => !item.equals(receiver._id))
            await sender.save()
            receiver.listfriend = await receiver.listfriend.filter((item) => !item.equals(sender._id))
            await receiver.save()
            return {
                EM: "cancel send addfriend is success!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "cancel send addfriend is error!",
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

module.exports = {
    sendfriendAdd, cancelsendfriend, cancelfriendbyreceiver, confirmaddfriend, cancelmaddfriend
}