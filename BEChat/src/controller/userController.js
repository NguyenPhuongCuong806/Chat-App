import { createUser, readUserInfo, findAllUser, findUserbyId, getalluserbychat } from "../services/userService";
import jwtAction from '../jwt/jwtAction'

const createUsers = async (req, res) => {
    try {
        let data = await createUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const readUserInfos = async (req, res) => {
    try {
        let data = await readUserInfo(req.body)
        if (data && data.DT) {
            await res.cookie("jwt", data.DT, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const userAccounts = async (req, res) => {
    if (req.user) {
        return res.status(200).json({
            EM: "ok",
            EC: 0,
            DT: req.user
        })
    } else {
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const getAlluser = async (req, res) => {
    try {
        let data = await findAllUser()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const findUserbyID = async (req, res) => {
    try {
        let data = await findUserbyId(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const getalluserbyChat = async (req, res) => {
    try {
        let data = await getalluserbychat(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

const logoutuser = async (req, res) => {
    try {
        let cookie = req.cookies
        if (cookie) {
            res.clearCookie("jwt");
        }
        return res.status(200).json({
            EM: "logout success",
            EC: 0,
            DT: []
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: '',
        })
    }
}

module.exports = {
    createUsers, readUserInfos, userAccounts, getAlluser, findUserbyID, getalluserbyChat, logoutuser
}