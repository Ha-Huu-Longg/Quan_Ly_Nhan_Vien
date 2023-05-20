import { AddressActionTypes } from "../constants";

// PROVINCE
export const getListProvinceAction = () => {
  return { type: AddressActionTypes.GET_LIST_PROVINCE };
};
export const getListProvinceSuccessAction = ({ res }) => {
  return { type: AddressActionTypes.GET_LIST_PROVINCE_SUCCESS, payload: { res } };
};
export const getListProvinceFailedAction = ({ errors}) => {
  return { type: AddressActionTypes.GET_LIST_PROVINCE_FAILED, payload: { errors } };
};

// DISTRICT
export const getListDistrictAction = () => {
  return { type: AddressActionTypes.GET_LIST_DISTRICT };
};
export const getListDistrictSuccessAction = ({ res }) => {
  return { type: AddressActionTypes.GET_LIST_DISTRICT_SUCCESS, payload: { res } };
};
export const getListDistrictFailedAction = ({ errors }) => {
  return { type: AddressActionTypes.GET_LIST_DISTRICT_FAILED, payload: { errors } };
};

// COMMUNE
export const getListCommuneAction = ({districtId}) => {
  console.log("districtId", districtId);
  return { type: AddressActionTypes.GET_LIST_COMMUNE, payload: {districtId} };
};
export const getListCommuneSuccessAction = ({ res, districtId }) => {
  return { type: AddressActionTypes.GET_LIST_COMMUNE_SUCCESS, payload: { res, districtId } };
};
export const getListCommuneFailedAction = ({ errors }) => {
  return { type: AddressActionTypes.GET_LIST_COMMUNE_FAILED, payload: { errors } };
};