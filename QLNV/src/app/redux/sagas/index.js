import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getEmployeeById, updateStatusEndEmployee } from 'app/views/UpdateHappenings/UpdateHappeningsService';
import { getEmployeeByIdSuccess, updateEndEmployeeSuccess } from '../actions/UpdateHappeningsActions';
import { getFormStaff, getStaffById, getStaffLList, getTotalItem } from 'app/views/CreateStaff/CreateStaffService';
import { getListStaffSuccess, getTotalStaffSuccess, getFormStaffSuccess, getStaffByIdSuccess } from '../actions/CreateStaffAction';
import leaderSaga from './LeaderSaga';
import salarySaga from './SalarySaga';
import promotedSaga from './PromotedSaga';
import proposedSaga from './ProposedSaga';
import endStaffSaga from './EndStaffSaga';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createStaffSaga from './CreateStaffSaga';
import { sendLeaderStaff } from 'app/views/CreateStaff/CreateStaffService';
import { sendLeaderSuccess } from '../actions/CreateStaffAction';
import { resCode } from 'app/views/GeneralSettings/constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* getStaffListSaga(action) {
    try {
        const data = yield call(() =>
            getStaffLList(action.payload, action.pageSize, action.statuses).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getListStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* getTotalSaga(action) {
    try {
        const data = yield call(() =>
            getTotalItem(action.payload).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getTotalStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* getStaffByIdSaga(action) {
    try {
        const data = yield call(() =>
            getStaffById(action.payload).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getStaffByIdSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* getFormStaffSaga(action) {
    try {
        const data = yield call(() =>
            getFormStaff(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(getFormStaffSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* getEmployeeByIdSaga(action) {
    try {
        const data = yield call(() =>
            getEmployeeById(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    return res?.data?.data;
                }
            }),
        );
        yield put(getEmployeeByIdSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updateEndEmployeeSaga(action) {
    try {
        const data = yield call(() =>
            updateStatusEndEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Trình lãnh đạo thành công');
                    action.handleClose();
                    action.openUpdateStatus();
                    return res?.data;
                } else {
                    toast.error(`Chỉ trình với trạng thái "Đã duyệt"`);
                }
            }),
        );
        yield put(updateEndEmployeeSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* sendLeaderSaga(action) {
    try {
        const data = yield call(() =>
            sendLeaderStaff(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Trình lãnh đạo thành công');
                    action.onClose();
                    return res?.data;
                } else {
                    toast.error(`Lỗi xung đột dữ liệu!`);
                }
            }),
        );
        yield put(sendLeaderSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* employeeSaga() {
    yield takeLatest('GET_LIST_STAFF', getStaffListSaga);
    yield takeLatest('GET_TOTAL_STAFF', getTotalSaga);
    yield takeLatest('GET_FORM_STAFF', getFormStaffSaga);
    yield takeLatest('GET_STAFF_BY_ID', getStaffByIdSaga);
    yield takeLatest('GET_EMPLOYEE_BY_ID', getEmployeeByIdSaga);
    yield takeLatest('UPDATE_END_STATUS', updateEndEmployeeSaga);
    yield takeLatest('SEND_LEADER', sendLeaderSaga);
    yield all([createStaffSaga(), endStaffSaga(), leaderSaga(), salarySaga(), promotedSaga(), proposedSaga()]);
}

export default employeeSaga;
