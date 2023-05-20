import axios from 'axios';
import ConstantList from '../../appConfig';
const API_PATH_employees = ConstantList.API_ENPOINT;

export const getStaffLList = (data, pageSize, statuses) => {
    const url = `${API_PATH_employees}/employees?statuses=${statuses}&page=${data}&size=${pageSize}`;

    return axios.get(url);
};

export const getTotalItem = (statuses) => {
    const url = `${API_PATH_employees}/employees/total?statuses=${statuses}`;

    return axios.get(url);
};

export const getStaffById = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}`;

    return axios.get(url, data);
};

export const addNewStaff = (data) => {
    const url = API_PATH_employees + '/employees';

    return axios.post(url, data);
};

export const updateStaff = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}`;

    return axios.put(url, data);
};

export const deleteStaff = ({ employeeId }) => {
    const url = `${API_PATH_employees}/employees/${employeeId}/status`;

    return axios.put(url, { status: 14 });
};

export const sendLeaderStaff = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/status`;

    return axios.put(url, data);
};

export const getFormStaff = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/form`;

    return axios.get(url);
};

export const updateFormStaff = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/form`;

    return axios.put(url, data);
};
