import axios from '../setup/axios'

const sendmessangeprivate = (data) => {
    return axios.post("/api/chat/send-private", data)
}

const getAllChatPrivate = (data) => {
    return axios.post("/api/chat/get-all-chat-private", data)
}

const getAllChat = (data) => {
    return axios.post("/api/chat/get-all-chat-info", data)

}

const getAllGroupMessangebyGroupId = (data) => {
    return axios.post("/api/group/get-all-messenge-by-group-Id", data)
}

const sendmessangeingroup = (data) => {
    return axios.post("/api/chat/send-messange-group", data)
}

const getAllChatingroup = () => {
    return axios.post("/api/chat/get-all-chat-group-info")
}

export {
    sendmessangeprivate, getAllChatPrivate, getAllChat, getAllGroupMessangebyGroupId, sendmessangeingroup, getAllChatingroup
}