import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { _getEvents, _getDetailEvent } from '../apis/event.api';
import * as types from '../constants/actionType.constants';
import { STATUS_CODE } from '../constants/status.constants';
import allAction from '../actions/';
function* getEventsSaga({ payload }) {
  const { query } = payload;

  const res = yield call(_getEvents, query);
  const { status, data: dataRes } = res;

  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.eventActions.getEventsSuccess(dataRes.data));
  } else {
    console.log('get event fail');
  }
}
function* getDetailEventSaga({ payload }) {
  const { params } = payload;
  const res = yield call(_getDetailEvent, params);
  const { status, data: dataRes } = res;
  console.log(status);
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.eventActions.getDetailEventSuccess(dataRes.data));
  }
}
function* rootSaga() {
  yield takeLatest(types.GET_EVENTS, getEventsSaga);
  yield takeLatest(types.GET_DETAIL_EVENT, getDetailEventSaga);
}
export default rootSaga;
