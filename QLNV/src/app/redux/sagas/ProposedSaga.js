import { call, put, takeLatest } from 'redux-saga/effects';
import { addProposedEmployee, deleteProposedEmployee, getProposedEmployee, updateProposedEmployee } from 'app/views/UpdateHappenings/UpdateHappeningsService';
import { addProposedSuccess, deleteProposedSuccess, getListProposedSuccess, updateProposedSuccess } from '../actions/UpdateHappeningsActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resCode } from 'app/views/GeneralSettings/constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* getListProposedSaga(action) {
    try {
        const data = yield call(() =>
            getProposedEmployee(action.payload).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getListProposedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* addProposedSaga(action) {
    try {
        const data = yield call(() =>
            addProposedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Thêm thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(addProposedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updateProposedSaga(action) {
    try {
        const data = yield call(() =>
            updateProposedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Sửa thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updateProposedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* deleteProposedSaga(action) {
    try {
        const data = yield call(() =>
            deleteProposedEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Xóa thành công');
                    return res?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(deleteProposedSuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* proposedSaga() {
    yield takeLatest('GET_LIST_PROPOSED', getListProposedSaga);
    yield takeLatest('ADD_PROPOSED', addProposedSaga);
    yield takeLatest('UPDATE_PROPOSED', updateProposedSaga);
    yield takeLatest('DELETE_PROPOSED', deleteProposedSaga);
}

export default proposedSaga;
