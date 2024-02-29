import User from "../modules/user"
import Group from '../modules/group'
import { getinfobyId } from '../middleware/jwtMiddle'
import GroupMessange from '../modules/groupMessange'
import mongoose from "mongoose"

const AddNewGroup = async (data) => {
    try {
        let members = await getinfobyId(data['members[]'])
        let author = await User.findById(data.authorId, "_id firstname lastname phonenumber").exec();
        await Group.create({ author: author, name: data.groupname, members })
        return {
            EM: "create new group is success!",
            EC: 0,
            DT: []
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

const findgroupByUserId = async (id) => {
    let group = await Group.find({ members: { $in: [id] } }).exec();

    let arr = await Promise.all(group.map(async (item) => {
        const itemObject = item.toObject();

        const membersInfo = await getinfobyId(item.members);
        return {
            ...itemObject,
            members: membersInfo
        };
    }));

    return arr;
};

const getmessangefinalofgroup = async (data) => {
    try {
        let arrgroup = await findgroupByUserId(data.id);
        if (arrgroup && arrgroup.length > 0) {
            let arr = await Promise.all(arrgroup.map(async (item, index) => {
                let data = await GroupMessange.find({ group: new mongoose.Types.ObjectId(item._id) })
                    .sort({ createdAt: 'desc' })
                    .populate("sender")
                    .limit(1)
                    .exec();
                if (data && data.length > 0) {
                    return data[0];
                } else {
                    return {}
                }
            }))
            return {
                EM: "get messange final of group is success!",
                EC: 0,
                DT: arr
            }
        }
        return {
            EM: "get messange final of group is error!",
            EC: 0,
            DT: []
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

const ApifindgroupbyUserId = async (data) => {
    try {
        let group = await Group.find({ members: { $in: [data.id] } }).exec();
        if (group && group.length > 0) {
            return {
                EM: "get all group is success!",
                EC: 0,
                DT: group
            }
        }
        return {
            EM: "get all group is success!",
            EC: 0,
            DT: []
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

const getMessangebyGroupId = async (data) => {
    try {
        let group;

        const totalDocuments = await GroupMessange.countDocuments({ group: new mongoose.Types.ObjectId(data.id) });
        const remainingDocuments = Math.max(0, totalDocuments - data.skip);
        const limit = Math.min(6, remainingDocuments);

        group = await GroupMessange.find({ group: new mongoose.Types.ObjectId(data.id) })
            .populate({
                path: 'sender',
                select: '_id firstname lastname phonenumber'
            })
            .sort({ createdAt: 'desc' })
            .limit(limit)
            .skip(data.skip)
            .exec();

        if (group && group.length > 0) {
            const reversedGroup = group.reverse();
            return {
                EM: "get all group messange is success!",
                EC: 0,
                DT: reversedGroup,
            };
        } else {
            return {
                EM: "get all group messange is success!",
                EC: 0,
                DT: [],
            };
        }
    } catch (error) {
        console.log("server " + error);
        return {
            EM: "something wrong from server",
            EC: 1,
            DT: [],
        };
    }
};



module.exports = {
    AddNewGroup, findgroupByUserId, ApifindgroupbyUserId, getMessangebyGroupId, getmessangefinalofgroup
}