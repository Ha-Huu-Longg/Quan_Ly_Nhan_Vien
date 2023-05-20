import axios from "axios";
import ConstantList from "../../appConfig";
const API_ROOT = ConstantList.API_ENPOINT

export const getTotalByStatus = (arr) => {
    const url = API_ROOT + `/employees/total?statuses=${arr.join(",")}`
    return axios.get(url)
}

export const getByStatus = (obj) => {
    const url = API_ROOT + `/employees?statuses=${obj.arr.join(",")}&page=${obj.page}&size=20`
    return axios.get(url)
}

export const getById = (id) => {
    const url = API_ROOT + `/employees/${id}`
    return axios.get(url)
}

export const update = (obj) => {
    const url = API_ROOT + `/employees/${obj.employeeId}/status`
    return axios.put(url, obj)
}

export const getForm = (id) => {
    const url = API_ROOT + `/employees/${id}/form`
    return axios.get(url)
}

