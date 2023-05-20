import axios from 'axios';
import ConstantList from '../../appConfig';
const API_PATH_employees = ConstantList.API_ENPOINT;

export const getEmployeeById = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}`;

    return axios.get(url, data);
};

export const getSalaryList = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/increase-salary?page=1&size=20`;

    return axios.get(url);
};

export const addSalaryEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/increase-salary?page=1&size=20`;

    return axios.post(url, data);
};

export const deleteSalaryEmployee = (id) => {
    const url = `${API_PATH_employees}/employees/increase-salary/${id}`;

    return axios.delete(url);
};

export const updateSalaryEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/increase-salary/${data.salaryId}`;

    return axios.put(url, data);
};

export const updateStatusSalaryEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/increase-salary/${data.salaryId}/stt?status=${data.status}`;

    return axios.put(url, data);
};

export const getProposedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/propose-consult?page=1&size=20`;

    return axios.get(url, data);
};

export const addProposedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/propose-consult?page=1&size=20`;

    return axios.post(url, data);
};

export const deleteProposedEmployee = (id) => {
    const url = `${API_PATH_employees}/employees/propose-consult/${id}`;

    return axios.delete(url);
};

export const updateProposedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/propose-consult/${data.proposalConsultationId}`;

    return axios.put(url, data);
};

export const updateStatusProposedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/propose-consult/${data.proposalConsultationId}/stt?status=2`;

    return axios.put(url, data);
};

export const getPromotedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/promote?page=1&size=20`;

    return axios.get(url, data);
};

export const addPromotedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/promote?page=1&size=20`;

    return axios.post(url, data);
};

export const deletePromotedEmployee = (id) => {
    const url = `${API_PATH_employees}/employees/promote/${id}`;

    return axios.delete(url);
};

export const updatePromotedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/promote/${data.promotionId}`;

    return axios.put(url, data);
};

export const updateStatusPromotedEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/promote/${data.promotionId}/stt?status=2`;

    return axios.put(url, data);
};

export const updateStatusEndEmployee = (data) => {
    const url = `${API_PATH_employees}/employees/${data.employeeId}/status`;

    return axios.put(url, data);
};
