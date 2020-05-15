import * as types from '../constants/actionType.constants';

const getInterface = () => {
  return {
    type: types.GET_INTERFACE,
  };
};
const getInterfaceSuccess = (data) => {
  return {
    type: types.GET_INTERFACE_SUCCESS,
    payload: {
      data,
    },
  };
};
const toggleStatusInterface = (sid) => {
  return {
    type: types.TOGGLE_STATUS_INTERFACE,
    payload: {
      sid,
    },
  };
};
const toggleStatusInterfaceSuccess = (sid) => {
  return {
    type: types.TOGGLE_STATUS_INTERFACE_SUCCESS,
    payload: {
      sid,
    },
  };
};
const restartInterface = (sid) => {
  return {
    type: types.RESTART_INTERFACE,
    payload: {
      sid,
    },
  };
};
const restartInterfaceSuccess = (sid) => {
  return {
    type: types.RESTART_INTERFACE_SUCCESS,
    payload: {
      sid,
    },
  };
};
const deleteInterface = (sid) => {
  return {
    type: types.DELETE_INTERFACE,
    payload: {
      sid,
    },
  };
};

const createInterface = (data) => {
  return {
    type: types.CREATE_INTERFACE,
    payload: {
      data,
    },
  };
};
export default {
  getInterface,
  getInterfaceSuccess,
  toggleStatusInterface,
  toggleStatusInterfaceSuccess,
  restartInterface,
  restartInterfaceSuccess,
  deleteInterface,
  createInterface,
};
