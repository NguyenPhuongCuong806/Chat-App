import friendService from '../services/friendService'

const sendaddfriend = async (req, res) => {
    try {
        let data = await friendService.sendfriendAdd(req.body.phonesender, req.body.phonereceiver)
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

const cancelsendaddfriend = async (req, res) => {
    try {
        let data = await friendService.cancelsendfriend(req.body.phonesender, req.body.phonereceiver)
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

const canceladdfriendbyreceiver = async (req, res) => {
    try {
        let data = await friendService.cancelfriendbyreceiver(req.body.phonesender, req.body.phonereceiver)
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

const confrimAddfriend = async (req, res) => {
    try {
        let data = await friendService.confirmaddfriend(req.body.phonesender, req.body.phonereceiver)
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

const cancelAddfriend = async (req, res) => {
    try {
        let data = await friendService.cancelmaddfriend(req.body.phonesender, req.body.phonereceiver)
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
    sendaddfriend, cancelsendaddfriend, canceladdfriendbyreceiver, confrimAddfriend, cancelAddfriend
}