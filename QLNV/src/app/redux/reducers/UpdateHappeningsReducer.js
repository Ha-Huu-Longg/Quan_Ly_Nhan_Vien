const initialState = {
    EmployeeRecord: {},
    SalaryList: [],
    salaryRender: false,
    newSalaryId: null,
    PromotedList: [],
    PromotedRender: false,
    newPromotedId: null,
    ProposedList: [],
    ProposedRender: false,
    newProposedId: null,
};

const UpdateHappeningReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_EMPLOYEE_BY_ID_SUCCESS': {
            return {
                ...state,
                EmployeeRecord: payload?.employeeInfo,
            };
        }
        case 'GET_LIST_SALARY_SUCCESS': {
            return {
                ...state,
                SalaryList: payload,
                salaryRender: false,
            };
        }
        case 'ADD_SALARY_SUCCESS': {
            return {
                ...state,
                salaryRender: true,
                newSalaryId: payload[0].salaryId,
            };
        }
        case 'UPDATE_SALARY_SUCCESS': {
            return {
                ...state,
                salaryRender: true,
            };
        }
        case 'DELETE_SALARY_SUCCESS': {
            return {
                ...state,
                salaryRender: true,
            };
        }
        case 'GET_LIST_PROMOTED_SUCCESS': {
            return {
                ...state,
                PromotedList: payload,
                PromotedRender: false,
            };
        }
        case 'ADD_PROMOTED_SUCCESS': {
            return {
                ...state,
                PromotedRender: true,
                newPromotedId: payload[0].promotionId,
            };
        }
        case 'UPDATE_PROMOTED_SUCCESS': {
            return {
                ...state,
                PromotedRender: true,
            };
        }
        case 'UPDATE_STATUS_PROMOTED_SUCCESS': {
            return {
                ...state,
                PromotedRender: true,
            };
        }
        case 'DELETE_PROMOTED_SUCCESS': {
            return {
                ...state,
                PromotedRender: true,
            };
        }
        case 'GET_LIST_PROPOSED_SUCCESS': {
            return {
                ...state,
                ProposedList: payload,
                ProposedRender: false,
            };
        }
        case 'ADD_PROPOSED_SUCCESS': {
            return {
                ...state,
                ProposedRender: true,
                newProposedId: payload[0].proposalConsultationId,
            };
        }
        case 'UPDATE_PROPOSED_SUCCESS': {
            return {
                ...state,
                ProposedRender: true,
            };
        }
        case 'DELETE_PROPOSED_SUCCESS': {
            return {
                ...state,
                ProposedRender: true,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default UpdateHappeningReducer;
