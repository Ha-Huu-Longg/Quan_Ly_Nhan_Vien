import axios from 'axios';
import ConstantList from '../../appConfig';
const API_PATH_employees = ConstantList.API_ENPOINT;

export const updateListStaff = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/status`;

    return axios.put(url, data);
};
