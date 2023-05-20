import {
    GET_LIST_SALARY,
    GET_LIST_SALARY_SUCCESS,
    ADD_SALARY_SUCCESS,
    ADD_SALARY,
    DELETE_SALARY,
    DELETE_SALARY_SUCCESS,
    GET_LIST_PROMOTED,
    GET_LIST_PROMOTED_SUCCESS,
    ADD_PROMOTED,
    ADD_PROMOTED_SUCCESS,
    DELETE_PROMOTED,
    DELETE_PROMOTED_SUCCESS,
    UPDATE_PROMOTED,
    UPDATE_PROMOTED_SUCCESS,
    UPDATE_SALARY,
    UPDATE_SALARY_SUCCESS,
    GET_LIST_PROPOSED,
    GET_LIST_PROPOSED_SUCCESS,
    ADD_PROPOSED,
    ADD_PROPOSED_SUCCESS,
    UPDATE_PROPOSED,
    UPDATE_PROPOSED_SUCCESS,
    DELETE_PROPOSED,
    DELETE_PROPOSED_SUCCESS,
    UPDATE_END_STATUS,
    UPDATE_END_STATUS_SUCCESS,
    UPDATE_STATUS_PROMOTED,
    UPDATE_STATUS_PROMOTED_SUCCESS,
    GET_EMPLOYEE_BY_ID,
    GET_EMPLOYEE_BY_ID_SUCCESS,
} from '../constants/constants';

export const getEmployeeById = (data) => {
    return {
        type: GET_EMPLOYEE_BY_ID,
        payload: data,
    };
};

export const getEmployeeByIdSuccess = (data) => {
    return {
        type: GET_EMPLOYEE_BY_ID_SUCCESS,
        payload: data,
    };
};

export const getListSalary = (data) => {
    return {
        type: GET_LIST_SALARY,
        payload: data,
    };
};

export const getListSalarySuccess = (data) => {
    return {
        type: GET_LIST_SALARY_SUCCESS,
        payload: data,
    };
};

export const addSalary = (data) => {
    return {
        type: ADD_SALARY,
        payload: data,
    };
};

export const addSalarySuccess = (data) => {
    return {
        type: ADD_SALARY_SUCCESS,
        payload: data,
    };
};

export const updateSalary = (data) => {
    return {
        type: UPDATE_SALARY,
        payload: data,
    };
};

export const updateSalarySuccess = (data) => {
    return {
        type: UPDATE_SALARY_SUCCESS,
        payload: data,
    };
};

export const deleteSalary = (data) => {
    return {
        type: DELETE_SALARY,
        payload: data,
    };
};

export const deleteSalarySuccess = (data) => {
    return {
        type: DELETE_SALARY_SUCCESS,
        payload: data,
    };
};

export const getListPromoted = (data) => {
    return {
        type: GET_LIST_PROMOTED,
        payload: data,
    };
};

export const getListPromotedSuccess = (data) => {
    return {
        type: GET_LIST_PROMOTED_SUCCESS,
        payload: data,
    };
};

export const addPromoted = (data) => {
    return {
        type: ADD_PROMOTED,
        payload: data,
    };
};

export const addPromotedSuccess = (data) => {
    return {
        type: ADD_PROMOTED_SUCCESS,
        payload: data,
    };
};

export const updatePromoted = (data) => {
    return {
        type: UPDATE_PROMOTED,
        payload: data,
    };
};

export const updatePromotedSuccess = (data) => {
    return {
        type: UPDATE_PROMOTED_SUCCESS,
        payload: data,
    };
};

export const updateStatusPromoted = (data, handleSendLeader, handleShowPromotedForm) => {
    return {
        type: UPDATE_STATUS_PROMOTED,
        payload: data,
        handleSendLeader: handleSendLeader,
        handleShowPromotedForm: handleShowPromotedForm,
    };
};

export const updateStatusPromotedSuccess = (data) => {
    return {
        type: UPDATE_STATUS_PROMOTED_SUCCESS,
        payload: data,
    };
};

export const deletePromoted = (data) => {
    return {
        type: DELETE_PROMOTED,
        payload: data,
    };
};

export const deletePromotedSuccess = (data) => {
    return {
        type: DELETE_PROMOTED_SUCCESS,
        payload: data,
    };
};

export const getListProposed = (data) => {
    return {
        type: GET_LIST_PROPOSED,
        payload: data,
    };
};

export const getListProposedSuccess = (data) => {
    return {
        type: GET_LIST_PROPOSED_SUCCESS,
        payload: data,
    };
};

export const addProposed = (data) => {
    return {
        type: ADD_PROPOSED,
        payload: data,
    };
};

export const addProposedSuccess = (data) => {
    return {
        type: ADD_PROPOSED_SUCCESS,
        payload: data,
    };
};

export const updateProposed = (data) => {
    return {
        type: UPDATE_PROPOSED,
        payload: data,
    };
};

export const updateProposedSuccess = (data) => {
    return {
        type: UPDATE_PROPOSED_SUCCESS,
        payload: data,
    };
};

export const deleteProposed = (data) => {
    return {
        type: DELETE_PROPOSED,
        payload: data,
    };
};

export const deleteProposedSuccess = (data) => {
    return {
        type: DELETE_PROPOSED_SUCCESS,
        payload: data,
    };
};

export const updateEndEmployee = (data, handleClose, openUpdateStatus) => {
    return {
        type: UPDATE_END_STATUS,
        payload: data,
        handleClose,
        openUpdateStatus,
    };
};

export const updateEndEmployeeSuccess = (data) => {
    return {
        type: UPDATE_END_STATUS_SUCCESS,
        payload: data,
    };
};
