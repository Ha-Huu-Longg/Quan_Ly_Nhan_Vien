const initialState = {
    StaffList: [],
    total: 0,
    page: 1,
    pageSize: 10,
    reRender: false,
    dataForm: {},
    dataStaffById: {},
};

const CreateStaffReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_LIST_STAFF_SUCCESS': {
            return {
                ...state,
                StaffList: payload,
                reRender: false,
            };
        }
        case 'UPDATE_END_STATUS_SUCCESS': {
            return {
                ...state,
                reRender: true,
            };
        }
        case 'UPDATE_STATUS_END_STAFF_SUCCESS': {
            return {
                ...state,
                reRender: true,
            };
        }
        case 'GET_TOTAL_STAFF_SUCCESS': {
            return {
                ...state,
                total: payload,
            };
        }
        case 'GET_PAGE_CREATE_STAFF': {
            return {
                ...state,
                page: payload.page,
                pageSize: payload.pageSize,
            };
        }
        case 'DELETE_STAFF_SUCCESS': {
            return {
                ...state,
                reRender: true,
            };
        }
        case 'GET_FORM_STAFF_SUCCESS': {
            return {
                ...state,
                dataForm: payload,
            };
        }
        case 'UPDATE_FORM_STAFF_SUCCESS': {
            return {
                ...state,
                dataForm: payload,
                reRender: true,
            };
        }
        case 'GET_STAFF_BY_ID_SUCCESS': {
            return {
                ...state,
                dataStaffById: payload,
            };
        }
        case 'SEND_LEADER_SUCCESS': {
            return {
                ...state,
                reRender: true,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default CreateStaffReducer;
