import axios from '../setup/axios';

const RegisterUser = (user) => {
    return axios.post("/api/user/create-user", user)
}

const loginUser = (user) => {
    return axios.post("/api/user/get-info", user)
}

const accountUser = () => {
    return axios.get("/api/user/account");
}

const getAllUser = () => {
    return axios.get("/api/user/get-all-user")
}

const getUserbyId = (data) => {
    return axios.post("/api/user/get-user-by-id", data)
}

const getAlluserByChat = (id) => {
    return axios.post("/api/chat/get-all-chat", id)
}

const logoutuser = () => {
    return axios.post("/api/user/logout-user")
}

export {
    RegisterUser, loginUser, accountUser, getAllUser, getUserbyId, getAlluserByChat, logoutuser
}