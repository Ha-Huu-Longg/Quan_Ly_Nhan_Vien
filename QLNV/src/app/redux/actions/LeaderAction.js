import {
    GET_LIST_PENDING,
    SET_LIST_PENDING,
    GET_LIST_ACCEPTED,
    SET_LIST_ACCEPTED_1,
    SET_LIST_ACCEPTED_2,
} from '../constants/leaderconstants';

export const getListPendingAction = () => {
    return {
        type: GET_LIST_PENDING
    };
};

export const setListPendingAction = (data) => {
    return {
        type: SET_LIST_PENDING,
        payload: data,
    };
};

export const getListAcceptedAction = () => {
    return {
        type: GET_LIST_ACCEPTED
    };
};

export const setListAccepted1Action = (data) => {
    return {
        type: SET_LIST_ACCEPTED_1,
        payload: data,
    };
};

export const setListAccepted2Action = (data) => {
    return {
        type: SET_LIST_ACCEPTED_2,
        payload: data,
    };
};