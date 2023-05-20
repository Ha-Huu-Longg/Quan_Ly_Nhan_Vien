import { call, put, takeLatest } from "redux-saga/effects"
// import {} from "../../views/Pending/PendingService"
import { setListPendingAction,
    setListAccepted2Action, setListAccepted1Action 
} from "../actions/LeaderAction"
import {GET_LIST_PENDING, GET_LIST_ACCEPTED} from "../constants/leaderconstants"
import {getTotalByStatus,getByStatus } from "../../views/Pending/PendingService"

function* getList(arr) {
    try {
        const resTotal = yield call(getTotalByStatus, arr) 
        let list = [], page = 0

        do {
            ++page
            const res = yield call(getByStatus, {arr, page})
            list = list.concat(res.data.data)
        } while (list.length < resTotal.data.data)
        
        return list
    } catch (error) {
        console.log("==> loi: ", error)
    }
}

function* getListPendingSaga() {
    try {
        const list = yield getList([3, 8])
        yield put(setListPendingAction(list))
    } catch (error) {
        console.log("==> loi: ", error)
    }
}

function* getListAcceptedSaga() {
    try {
        const list1 = yield getList([4, 5, 6, 9, 10])
        yield put(setListAccepted1Action(list1))
        const list2 = yield getList([11])
        yield put(setListAccepted2Action(list2))
    } catch (error) {
        console.log("==> loi: ", error)
    }
}

function* leaderSaga  () {
    yield takeLatest(GET_LIST_PENDING, getListPendingSaga)
    yield takeLatest(GET_LIST_ACCEPTED, getListAcceptedSaga)
}

export default leaderSaga
