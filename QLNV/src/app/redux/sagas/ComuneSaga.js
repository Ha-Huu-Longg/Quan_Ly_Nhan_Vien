// import { getListCommune } from "app/views/CreateStaff/CreateStaffService";
// import { call, put } from "redux-saga/effects";
// import { getListCommuneSuccessAction, getListCommuneFailedAction } from "../actions/AddressActions";

// // PROVINCE
// export default function* comuneSaga(action) {

//     try {
//         const res = yield call(getListCommune,{});
//         yield put(
//             getListCommuneSuccessAction({res: res, districtId: action?.payload?.districtId })
//         )
//     } catch (error) {
//         yield put(
//             getListCommuneFailedAction({errors: error})
//         );
//     }
// }
