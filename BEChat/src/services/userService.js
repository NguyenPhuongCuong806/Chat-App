const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
import User from "../modules/user";
import jwtAction from '../jwt/jwtAction'
import { getinfobyId } from '../middleware/jwtMiddle'
import PrivateMessange from "../modules/privateMessange";
import GroupServices from '../services/groupService'
import mongoose from "mongoose";

const hashPasswordUser = (password) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkPhonenumber = async (phonenumber) => {
    let check = false;
    const user = await User.findOne({ phonenumber: phonenumber }).exec()
    if (user) {
        check = true;
        return check;
    }
    return check;
}


const createUser = async (user) => {
    try {
        let check = await checkPhonenumber(user.phonenumber);
        if (check === true) {
            return {
                EM: "phone number exits",
                EC: 1,
                DT: []
            }
        } else {
            let password = hashPasswordUser(user.password);
            await User.create({ ...user, password });
            return {
                EM: "Save user is success!",
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

const readUserInfo = async (data) => {
    try {
        let user = await User.findOne({ phonenumber: data.phonenumber }).exec()
        if (user) {
            let compare = bcrypt.compareSync(data.password, user.password);
            if (compare) {
                let token = jwtAction.signToken(user.phonenumber);
                return {
                    EM: "get info user is success!",
                    EC: 0,
                    DT: token
                }
            } else {
                return {
                    EM: "phone number or password not exactly",
                    EC: 1,
                    DT: []
                }
            }
        } else {
            return {
                EM: "phone number or password not exactly",
                EC: 1,
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

const findAllUser = async () => {
    try {
        let listuser = await User.find({}, "_id firstname lastname phonenumber");
        if (listuser && listuser.length > 0) {
            return {
                EM: "get all user is success!",
                EC: 0,
                DT: listuser
            }
        } else {
            return {
                EM: "get all user is error",
                EC: 1,
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

const findUserbyId = async (id) => {
    try {
        let user = await User.findById(id, "_id firstname lastname phonenumber").exec()
        if (user) {
            return {
                EM: "get user is success!",
                EC: 0,
                DT: user
            }
        } else {
            return {
                EM: "get user is error",
                EC: 1,
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

const getalluserbychat = async (id) => {
    try {
        let data = [];
        let users = await PrivateMessange.find({
            $or: [{ sender: new mongoose.Types.ObjectId(id) }, { receiver: new mongoose.Types.ObjectId(id) }]
        }
            , "receiver sender").exec();

        let user = await User.findById(id, "listfriend").exec();
        if ((users && users.length > 0) || (user && user.listfriend && user.listfriend.length > 0)) {
            let customusers = users.filter(item => item.receiver.toString() === id)
                .map((item) => {
                    return item.sender.toString();
                }).filter(item => item !== null && item !== undefined && item !== "");

            let customuserssender = users.filter(item => item.sender.toString() === id)
                .map(item => item.receiver.toString())
                .filter(item => item !== null && item !== undefined && item !== "");

            let customuser = user.listfriend.map((item) => {
                return item.toString()
            }).filter(item => item !== null && item !== undefined && item !== "")

            let group = await GroupServices.findgroupByUserId(id);


            data = [...new Set([...customusers, ...customuser, ...customuserssender])]
            let arr = await getinfobyId(data.filter(item => item !== null && item !== undefined && item !== ""));
            let arrupdate = [...arr,
            ...group.map((item, index) => {
                return item;
            })
            ].filter(item => item !== null && item !== undefined && item !== "")
            return {
                EM: "get user is success!",
                EC: 0,
                DT: arrupdate
            }
        } else {
            return {
                EM: "get user is error",
                EC: 1,
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
    createUser, readUserInfo, findAllUser, findUserbyId, getalluserbychat
}