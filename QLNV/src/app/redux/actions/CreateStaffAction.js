import {
    DELETE_STAFF,
    DELETE_STAFF_SUCCESS,
    GET_FORM_STAFF,
    GET_FORM_STAFF_SUCCESS,
    GET_LIST_STAFF,
    GET_LIST_STAFF_SUCCESS,
    GET_PAGE_CREATE_STAFF,
    GET_STAFF_BY_ID,
    GET_STAFF_BY_ID_SUCCESS,
    GET_TOTAL_STAFF,
    GET_TOTAL_STAFF_SUCCESS,
    RESET_FORM,
    SEND_LEADER,
    SEND_LEADER_SUCCESS,
    UPDATE_FORM_STAFF,
    UPDATE_FORM_STAFF_SUCCESS,
} from '../constants/CreateStaffConstants';

export const getListStaff = (data, pageSize, statuses) => {
    return {
        type: GET_LIST_STAFF,
        payload: data,
        pageSize: pageSize,
        statuses: statuses,
    };
};

export const getListStaffSuccess = (data, pageSize) => {
    return {
        type: GET_LIST_STAFF_SUCCESS,
        payload: data,
        pageSize: pageSize,
    };
};

export const getTotalStaff = (data) => {
    return {
        type: GET_TOTAL_STAFF,
        payload: data,
    };
};

export const getTotalStaffSuccess = (data) => {
    return {
        type: GET_TOTAL_STAFF_SUCCESS,
        payload: data,
    };
};

export const getPageCreateStaff = (page, pageSize) => {
    return {
        type: GET_PAGE_CREATE_STAFF,
        payload: { page, pageSize },
    };
};

export const deleteStaff = (data) => {
    return {
        type: DELETE_STAFF,
        payload: data,
    };
};

export const deleteStaffSuccess = (data) => {
    return {
        type: DELETE_STAFF_SUCCESS,
        payload: data,
    };
};

export const getFormStaff = (data) => {
    return {
        type: GET_FORM_STAFF,
        payload: data,
    };
};

export const getFormStaffSuccess = (data) => {
    return {
        type: GET_FORM_STAFF_SUCCESS,
        payload: data,
    };
};

export const updateFormStaff = (data, BtnSendLeader) => {
    return {
        type: UPDATE_FORM_STAFF,
        payload: data,
        BtnSendLeader: BtnSendLeader,
    };
};

export const updateFormStaffSuccess = (data) => {
    return {
        type: UPDATE_FORM_STAFF_SUCCESS,
        payload: data,
    };
};

export const getStaffById = (data) => {
    return {
        type: GET_STAFF_BY_ID,
        payload: data,
    };
};

export const getStaffByIdSuccess = (data) => {
    return {
        type: GET_STAFF_BY_ID_SUCCESS,
        payload: data,
    };
};

export const sendLeader = (data, onClose) => {
    return {
        type: SEND_LEADER,
        payload: data,
        onClose: onClose,
    };
};

export const sendLeaderSuccess = (data) => {
    return {
        type: SEND_LEADER_SUCCESS,
        payload: data,
    };
};
