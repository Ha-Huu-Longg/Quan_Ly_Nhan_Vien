import { call, put, takeLatest } from 'redux-saga/effects';

import { addSalaryEmployee, deleteSalaryEmployee, getSalaryList, updateSalaryEmployee } from 'app/views/UpdateHappenings/UpdateHappeningsService';
import { addSalarySuccess, deleteSalarySuccess, getListSalarySuccess, updateSalarySuccess } from '../actions/UpdateHappeningsActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resCode } from 'app/views/GeneralSettings/constant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    closeOnClick: true,
});

function* getListSalarySaga(action) {
    try {
        const data = yield call(() =>
            getSalaryList(action.payload).then((res) => {
                return res?.data?.data;
            }),
        );
        yield put(getListSalarySuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* addSalarySaga(action) {
    try {
        const data = yield call(() =>
            addSalaryEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Thêm thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(addSalarySuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* updateSalarySaga(action) {
    try {
        const data = yield call(() =>
            updateSalaryEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Sửa thành công');
                    return res?.data?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(updateSalarySuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* deleteSalarySaga(action) {
    try {
        const data = yield call(() =>
            deleteSalaryEmployee(action.payload).then((res) => {
                if (res?.data.code === resCode.success) {
                    toast.success('Xóa thành công');
                    return res?.data;
                } else {
                    toast.error(res?.data.message);
                }
            }),
        );
        yield put(deleteSalarySuccess(data));
    } catch (error) {
        console.error('err', error);
    }
}

function* salarySaga() {
    yield takeLatest('GET_LIST_SALARY', getListSalarySaga);
    yield takeLatest('ADD_SALARY', addSalarySaga);
    yield takeLatest('UPDATE_SALARY', updateSalarySaga);
    yield takeLatest('DELETE_SALARY', deleteSalarySaga);
}

export default salarySaga;
