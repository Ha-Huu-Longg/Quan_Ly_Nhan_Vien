import { AddressActionTypes } from "../constants";

const initialState = { provinceData: [], districtData: [], communeData: [], loading: false, errors: [] };

const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        // Province
        case AddressActionTypes.GET_LIST_PROVINCE_SUCCESS: {
            // console.log("action", action);
            return { ...state, loading: false, provinceData: action.payload?.res?.data?.data };
        }
        case AddressActionTypes.GET_LIST_PROVINCE_FAILED: {
            return { ...state, loading: false, errors: action.payload?.errors };
        }

        // District
        case AddressActionTypes.GET_LIST_DISTRICT_SUCCESS: {
            return { ...state, loading: false, districtData: action.payload?.res?.data?.data };
        }
        case AddressActionTypes.GET_LIST_DISTRICT_FAILED: {
            return { ...state, loading: false, errors: action.payload?.errors };
        }

        // commune
        case AddressActionTypes.GET_LIST_COMMUNE_SUCCESS: {
            // console.log("districtId", districtId);
            const dataComuneByDistrictId = action.payload?.res?.data?.data.filter((item) => item?.district?.id === action?.payload?.districtId.toString() )
            return { ...state, loading: false, communeData: dataComuneByDistrictId };
        }
        case AddressActionTypes.GET_LIST_COMMUNE_FAILED: {
            return { ...state, loading: false, errors: action.payload?.errors };
        }

        default:
            return state;
    }
};

export default AddressReducer;
