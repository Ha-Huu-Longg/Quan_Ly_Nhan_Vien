import { call, put, takeLatest } from 'redux-saga/effects';
import { addPromotedEmployee, deletePromotedEmployee, getPromotedEmployee, updatePromotedEmployee, updateStatusPromotedEmployee } from 'app/views/UpdateHappenings/UpdateHappeningsService';
import { addPromotedSuccess, deletePromotedSuccess, getListPromotedSuccess, updatePromotedSuccess, updateStatusPromotedSuccess } from '../actions/UpdateHappeningsActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resCode } from 'app/views/GeneralSettings/constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* getListPromotedSaga(action) {
    try {
        const data = yield call(() =>
            getPromotedEmployee(action.payload).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getListPromotedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* addPromotedSaga(action) {
    try {
        const data = yield call(() =>
            addPromotedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Thêm thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(addPromotedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updatePromotedSaga(action) {
    try {
        const data = yield call(() =>
            updatePromotedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Sửa thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updatePromotedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updateStatusPromotedSaga(action) {
    try {
        const data = yield call(() =>
            updateStatusPromotedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Trình lãnh đạo thành công');
                    action.handleSendLeader();
                    action.handleShowPromotedForm();
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updateStatusPromotedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* deletePromotedSaga(action) {
    try {
        const data = yield call(() =>
            deletePromotedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Xóa thành công');
                    return res?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(deletePromotedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* promotedSaga() {
    yield takeLatest('GET_LIST_PROMOTED', getListPromotedSaga);
    yield takeLatest('ADD_PROMOTED', addPromotedSaga);
    yield takeLatest('UPDATE_PROMOTED', updatePromotedSaga);
    yield takeLatest('UPDATE_STATUS_PROMOTED', updateStatusPromotedSaga);
    yield takeLatest('DELETE_PROMOTED', deletePromotedSaga);
}

export default promotedSaga;
