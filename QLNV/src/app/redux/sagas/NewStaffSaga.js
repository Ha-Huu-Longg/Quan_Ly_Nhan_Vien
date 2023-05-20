// import { getListNewStaff } from "app/views/CreateStaff/CreateStaffService";
// import { call, put } from "redux-saga/effects";
// import { getListNewStaffFailedAction, getListNewStaffSuccessAction } from "../actions/NewStaffAction";

// export default function* newStaffSaga() {

//     try {
//         const res = yield call(getListNewStaff,{});
//         yield put(
//             getListNewStaffSuccessAction({res: res})
//         )
//     } catch (error) {
//         console.log("error", error);
//         yield put(
//             getListNewStaffFailedAction({ errors: error })
//         );
//     }
// }
