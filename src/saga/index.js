import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { _getEvents, _getDetailEvent, _deleteAllEvent, _deleteSelectedEvents } from '../apis/event.api';
import {
  _getInterface,
  _toggleStatusInterface,
  _deleteInterface,
  _createInterface,
  _getRules,
  _deleteRule,
  _createRule,
  _updateRule,
} from '../apis/interface.api';
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
function* getInterfaceSaga() {
  const res = yield call(_getInterface);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    console.log(dataRes.data);
    yield put(allAction.interfaceActions.getInterfaceSuccess(dataRes.data));
  }
}
function* deleteAllEventSaga({ payload }) {
  const { query } = payload;
  const res = yield call(_deleteAllEvent, query);
  const { status, data: dataRes } = res;
  console.log(query);
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.eventActions.deleteAllEventSuccess(query.sid));
  }
}
function* deleteSelectedEventSaga({ payload }) {
  let { selectedEvents } = payload;
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_deleteSelectedEvents, selectedEvents);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.eventActions.deleteSelectedEventSuccess(selectedEvents));
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* toggleStatusInterfaceSaga({ payload }) {
  let { sid } = payload;
  yield put(allAction.uiActions.showLoading());
  let state = yield select();
  let { interfacesConfigured } = state.interfaces;
  let infoInterfaceToggle = interfacesConfigured.find((item) => item.sid === sid);

  // const res = yield call(_toggleStatusInterface, sid, !infoInterfaceToggle.status);
  const res = yield call(_toggleStatusInterface, sid, !infoInterfaceToggle.status);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) yield put(allAction.interfaceActions.toggleStatusInterfaceSuccess(sid));
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* restartInterfaceSaga({ payload }) {
  let { sid } = payload;
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_toggleStatusInterface, sid, 'restart');

  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.interfaceActions.restartInterfaceSuccess(sid));

    yield put(allAction.uiActions.hideLoading());
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* deleteInterfaceSaga({ payload }) {
  let { sid } = payload;
  yield put(allAction.uiActions.showLoading());
  const resDelete = yield call(_deleteInterface, sid);
  const { status: statusDelete, data: dataRes } = resDelete;
  if (statusDelete === STATUS_CODE.SUCCESS) {
    yield delay(1000);
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.interfaceActions.getInterfaceSuccess(dataRes.data));
  }

  yield put(allAction.uiActions.hideLoading());
}
function* createInterfaceSaga({ payload }) {
  let { data } = payload;
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_createInterface, data);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.uiActions.setStatusCallApi(true));
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.interfaceActions.getInterfaceSuccess(dataRes.data));
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}

function* getRulesSaga({ payload }) {
  const { sid } = payload;
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_getRules, sid);
  const { status, data: dataRes } = res;
  console.log(dataRes.data);
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.ruleActions.getRulesSuccess(dataRes.data));
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* deleteRuleSaga({ payload }) {
  const { sid, id } = payload;
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_deleteRule, sid, id);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.ruleActions.deleteRuleSuccess(sid, id));

    yield put(allAction.uiActions.hideLoading());
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* createRuleSaga({ payload }) {
  const { sid, rule } = payload;
  console.log(sid, rule);
  yield put(allAction.uiActions.showLoading());
  const res = yield call(_createRule, sid, rule);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.CREATE) {
    yield put(allAction.ruleActions.createRuleSuccess(dataRes.data));
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.modalActions.hideModal());
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* updateRuleSaga({ payload }) {
  const { rule } = payload;
  yield put(allAction.uiActions.showLoading());
  const { ruleEditing } = yield select((state) => state.rule);
  const res = yield call(_updateRule, rule, ruleEditing);
  const { status, data: dataRes } = res;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(allAction.ruleActions.updateRuleSuccess(dataRes.data));
    yield put(allAction.uiActions.hideLoading());
    yield put(allAction.modalActions.hideModal());
  }
  yield delay(1000);
  yield put(allAction.uiActions.hideLoading());
}
function* rootSaga() {
  yield takeLatest(types.GET_EVENTS, getEventsSaga);
  yield takeLatest(types.GET_DETAIL_EVENT, getDetailEventSaga);
  yield takeLatest(types.GET_INTERFACE, getInterfaceSaga);
  yield takeLatest(types.DELETE_ALL_EVENTS, deleteAllEventSaga);
  yield takeLatest(types.DELETE_SELECTED_EVENT, deleteSelectedEventSaga);
  yield takeLatest(types.TOGGLE_STATUS_INTERFACE, toggleStatusInterfaceSaga);
  yield takeLatest(types.RESTART_INTERFACE, restartInterfaceSaga);
  yield takeLatest(types.DELETE_INTERFACE, deleteInterfaceSaga);
  yield takeLatest(types.CREATE_INTERFACE, createInterfaceSaga);
  yield takeLatest(types.GET_RULES, getRulesSaga);
  yield takeLatest(types.DELETE_RULES, deleteRuleSaga);
  yield takeLatest(types.CREATE_RULE, createRuleSaga);
  yield takeLatest(types.UPDATE_RULE, updateRuleSaga);
}

export default rootSaga;
