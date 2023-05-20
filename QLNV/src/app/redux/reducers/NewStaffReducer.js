import { NewStaffActionTypes } from "../constants";
// import { toast } from 'react-toastify';

const initialState = { newStaffData: [], loading: false, errors: [] };

const NewStaffReducer = (state = initialState, action) => {
    switch (action.type) {
        // Get List Student
        case NewStaffActionTypes.GET_LIST_NEW_STAFF_SUCCESS: {
            return { ...state, loading: false, newStaffData: action.payload?.res?.data?.data };
        }
        case NewStaffActionTypes.GET_LIST_NEW_STAFF_FAILED: {
            return { ...state, loading: false, errors: action.payload?.errors };
        }
        default:
          return state;
    }
}; 
export default NewStaffReducer;