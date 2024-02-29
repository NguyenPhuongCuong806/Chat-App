import chatService from '../services/chatService'

const sendchatprivate = async (req, res) => {
    try {
        let data = await chatService.sendmessange(req.body);
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

const getAllchatPrivate = async (req, res) => {
    try {
        let data = await chatService.getAllChatPrivate(req.body);
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

const getAllchat = async (req, res) => {
    try {
        let data = await chatService.getAllChat(req.body);
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

const sendchatingroup = async (req, res) => {
    try {
        let data = await chatService.sendmessangeingroup(req.body);
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

const getAllchatingroup = async (req, res) => {
    try {
        let data = await chatService.getAllChatingroup();
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
    sendchatprivate, getAllchatPrivate, getAllchat, sendchatingroup, getAllchatingroup
}