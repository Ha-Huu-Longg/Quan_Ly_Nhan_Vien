const initialState = {
    FormEndStaff: {},
};

const EndStaffReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_FORM_END_STAFF_SUCCESS': {
            return {
                ...state,
                FormEndStaff: payload,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default EndStaffReducer;
