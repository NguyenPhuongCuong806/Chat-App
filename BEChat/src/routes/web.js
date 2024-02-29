import express from 'express'
import { test } from "../controller/testController"
import userController from "../controller/userController"
import { checkcookie, checkUserPermission } from '../middleware/jwtMiddle'
import friendController from '../controller/friendController'
import chatController from '../controller/chatController'
import groupController from '../controller/groupController'

const route = express.Router();

const initwebRoute = (app) => {

    route.all("*", checkcookie, checkUserPermission)

    route.get("/test", test)
    route.post("/user/create-user", userController.createUsers)
    route.post("/user/get-info", userController.readUserInfos)
    route.get("/user/account", userController.userAccounts)
    route.post("/user/get-user-by-id", userController.findUserbyID)

    route.get("/user/get-all-user", userController.getAlluser)
    route.post("/chat/get-all-chat", userController.getalluserbyChat)
    route.post("/user/logout-user", userController.logoutuser)



    //handle send add friend
    route.post("/user/send-add-friend", friendController.sendaddfriend)
    route.post("/user/cancel-send-add-friend", friendController.cancelsendaddfriend)
    route.post("/user/cancel-add-friend-by-receiver", friendController.canceladdfriendbyreceiver)
    route.post("/user/confirm-add-friend", friendController.confrimAddfriend)
    route.post("/user/cancel-add-friend", friendController.cancelAddfriend)

    //handle chat
    route.post("/chat/send-private", chatController.sendchatprivate)
    route.post("/chat/get-all-chat-private", chatController.getAllchatPrivate)
    route.post("/chat/get-all-chat-info", chatController.getAllchat)
    route.post("/chat/send-messange-group", chatController.sendchatingroup)
    route.post("/chat/get-all-chat-group-info", chatController.getAllchatingroup)

    //handle group
    route.post("/group/add-new-group", groupController.addNewGroup)
    route.post("/group/get-all-group", groupController.ApiGetAllGroup)
    route.post("/group/get-all-messenge-by-group-Id", groupController.getallmessangebyGroupId)
    route.post("/group/get-messenge-final-by-Id-of-user", groupController.getMessangefinalofgroup)


    app.use("/api/", route)
}

export default initwebRoute;