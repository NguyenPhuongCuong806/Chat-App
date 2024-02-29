import groupService from '../services/groupService'

const addNewGroup = async (req, res) => {
    try {
        let data = await groupService.AddNewGroup(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log("server " + error);
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const ApiGetAllGroup = async (req, res) => {
    try {
        let data = await groupService.ApifindgroupbyUserId(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log("server " + error);
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const getallmessangebyGroupId = async (req, res) => {
    try {
        let data = await groupService.getMessangebyGroupId(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log("server " + error);
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const getMessangefinalofgroup = async (req, res) => {
    try {
        let data = await groupService.getmessangefinalofgroup(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log("server " + error);
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

module.exports = {
    addNewGroup, ApiGetAllGroup, getallmessangebyGroupId, getMessangefinalofgroup
}