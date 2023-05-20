import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteStaff, updateFormStaff } from 'app/views/CreateStaff/CreateStaffService';
import { deleteStaffSuccess, updateFormStaffSuccess } from '../actions/CreateStaffAction';
import { resCode } from 'app/views/GeneralSettings/constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* deleteStaffSaga(action) {
    try {
        const data = yield call(() =>
            deleteStaff(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Xóa thành công');
                    return res?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(deleteStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updateFormStaffSaga(action) {
    try {
        const data = yield call(() =>
            updateFormStaff(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Lưu thành công');
                    action.BtnSendLeader(true);
                    return res?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updateFormStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* createStaffSaga() {
    yield takeLatest('DELETE_STAFF', deleteStaffSaga);
    yield takeLatest('UPDATE_FORM_STAFF', updateFormStaffSaga);
}

export default createStaffSaga;
