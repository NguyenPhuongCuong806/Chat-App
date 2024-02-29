import User from "../modules/user";
import jwtAction from '../jwt/jwtAction'

const nonSecurePaths = ['/user/create-user', '/user/get-info', '/user/logout-user'];

const getinfobyId = async (arr) => {
    let list = [];
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let user = await User.findById(arr[i], "_id firstname lastname phonenumber").exec();
            list.push(user)
        }
    }
    return list
}

const checkcookie = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let token = req.cookies;
    if (token && token.jwt) {
        let decoded = jwtAction.generateToken(token.jwt)
        if (decoded && decoded.data) {
            let user = await User.findOne({ phonenumber: decoded.data },
                '_id firstname lastname phonenumber is_online listfriend listaddfriend listsendaddfriend')
                .exec();
            if (user) {
                let listfriend = await getinfobyId(user.listfriend)
                let listaddfriend = await getinfobyId(user.listaddfriend)
                let listsendaddfriend = await getinfobyId(user.listsendaddfriend)
                req.user = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phonenumber: user.phonenumber,
                    is_online: user.is_online,
                    listfriend: listfriend,
                    listaddfriend: listaddfriend,
                    listsendaddfriend: listsendaddfriend
                }
                next()
            }
        } else {
            return res.status(403).json({
                EM: 'error Authentication',
                EC: '-1',
                DT: '',
            })
        }
    } else {
        return res.status(403).json({
            EM: 'error Authentication',
            EC: '-1',
            DT: '',
        })
    }

}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/user/account') return next();

    if (req.user) {
        // let email = req.user.email;
        // let role = req.user.groupwithRole.Roles;
        // let currentUrl = req.path;
        // if (!role || role.length === 0) {
        //     return res.status(403).json({
        //         EC: -1,
        //         DT: '',
        //         EM: 'you dont have permission to access this resource...'
        //     })
        // }
        // let canAccess = role.some(item => item.url === currentUrl || currentUrl.includes(item.url));
        // if (canAccess === true) {
        //     next();

        // } else {
        //     return res.status(403).json({
        //         EC: -1,
        //         DT: '',
        //         EM: 'you dont have permission to access this resource...'
        //     })
        // }
        next();

    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'not authentication the user'
        })
    }
}

module.exports = {
    checkcookie, getinfobyId, checkUserPermission
}