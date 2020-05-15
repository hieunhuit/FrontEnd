import * as types from '../constants/actionType.constants';
const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};
const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};
const setStatusCallApi = (status) => {
  return {
    type: types.SET_STATUS_CALL_API,
    payload: {
      status,
    },
  };
};
export default {
  showLoading,
  hideLoading,
  setStatusCallApi,
};
