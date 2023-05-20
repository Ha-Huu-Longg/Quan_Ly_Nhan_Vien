import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateListStaff } from 'app/views/EndStaff/EndStaffService';
import { updateStatusEndStaffSuccess } from '../actions/EndStaffActions';
import { resCode } from 'app/views/GeneralSettings/constant';
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* updateStatusEndStaffSaga(action) {
    try {
        const data = yield call(() =>
            updateListStaff(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Lưu hồ sơ thành công');
                    action.handleClose();
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updateStatusEndStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* endStaffSaga() {
    yield takeLatest('UPDATE_STATUS_END_STAFF', updateStatusEndStaffSaga);
}

export default endStaffSaga;
