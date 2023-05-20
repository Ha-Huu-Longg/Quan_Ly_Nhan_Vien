import { UPDATE_STATUS_END_STAFF, UPDATE_STATUS_END_STAFF_SUCCESS } from '../constants/endStaffConstants';

export const updateStatusEndStaff = (data, handleClose) => {
    return {
        type: UPDATE_STATUS_END_STAFF,
        payload: data,
        handleClose: handleClose,
    };
};

export const updateStatusEndStaffSuccess = (data) => {
    return {
        type: UPDATE_STATUS_END_STAFF_SUCCESS,
        payload: data,
    };
};
