
import { NewStaffActionTypes } from "../constants";

// GET_LIST_STUDENT
export const getListNewStaffAction = () => {
  return { type: NewStaffActionTypes.GET_LIST_NEW_STAFF };
};
export const getListNewStaffSuccessAction = ({ res }) => {
  return { type: NewStaffActionTypes.GET_LIST_NEW_STAFF_SUCCESS, payload: { res } };
};
export const getListNewStaffFailedAction = ({ errors}) => {
  return { type: NewStaffActionTypes.GET_LIST_NEW_STAFF_FAILED, payload: { errors } };
};