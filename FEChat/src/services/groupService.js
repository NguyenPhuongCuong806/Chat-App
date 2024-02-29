import axios from '../setup/axios'

const addnewGroup = (data) => {
    return axios.post("/api/group/add-new-group", data)
}

const getAllGroup = (data) => {
    return axios.post("/api/group/get-all-group", data)

}

const getMessangefinalofgroup = (data) => {
    return axios.post("/api/group/get-messenge-final-by-Id-of-user", data)
}

export {
    addnewGroup, getAllGroup, getMessangefinalofgroup
}