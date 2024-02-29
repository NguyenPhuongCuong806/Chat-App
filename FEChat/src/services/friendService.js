import axios from '../setup/axios';

const sendaddFriend = (data) => {
    return axios.post("/api/user/send-add-friend", data)
}

const cancelsendaddFriend = (data) => {
    return axios.post("/api/user/cancel-send-add-friend", data)
}

const canceladdFriendbyreceiver = (data) => {
    return axios.post("/api/user/cancel-add-friend-by-receiver", data)
}

const confirmaddfriend = (data) => {
    return axios.post("/api/user/confirm-add-friend", data)
}

const canceladdfriend = (data) => {
    return axios.post("/api/user/cancel-add-friend", data)
}


export {
    sendaddFriend, cancelsendaddFriend, canceladdFriendbyreceiver, confirmaddfriend, canceladdfriend
}