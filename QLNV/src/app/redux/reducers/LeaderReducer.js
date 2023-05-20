const initialState = {
    listPending: [],
    loadPending: true,
    listAccepted1: [],
    listAccepted2: [],
    loadAccepting: true
};

const LeaderReducer = function (state = initialState, { type, payload }) {
    switch (type) {

        case 'GET_LIST_PENDING': {
            return {
                ...state,
                loadPending: true
            }
        }

        case 'SET_LIST_PENDING': {
            return {
                ...state,
                listPending: payload,
                loadPending: false
            };
        }

        case 'GET_LIST_ACCEPTED_1': {
            return {
                ...state,
                loadPending: true
            }
        }

        case 'SET_LIST_ACCEPTED_1': {
            return {
                ...state,
                listAccepted1: payload,
            };
        }

        case 'SET_LIST_ACCEPTED_2': {
            return {
                ...state,
                listAccepted2: payload,
                loadAccepting: false
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
};

export default LeaderReducer;