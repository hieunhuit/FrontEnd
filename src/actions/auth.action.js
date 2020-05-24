import * as types from '../constants/actionType.constants';

const loginWithFacebook = (data, history, from) => {
  return {
    type: types.LOGIN_WITH_FACEBOOK,
    payload: {
      data,
      history,
      from,
    },
  };
};
const loginWithFacebookSuccess = (token) => {
  return {
    type: types.LOGIN_WITH_FACEBOOK_SUCCESS,
    payload: {
      token,
    },
  };
};
const login = (data, history, from) => {
  return {
    type: types.LOGIN,
    payload: {
      data,
      history,
      from,
    },
  };
};
const loginSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS,
  };
};
const loginFail = (msg) => {
  return {
    type: types.LOGIN_FAIL,
    payload: {
      msg,
    },
  };
};

const register = (data) => {
  return {
    type: types.REGISTER,
    payload: {
      data,
    },
  };
};
const registerSuccess = () => {
  return {
    type: types.REGISTER_SUCCESS,
  };
};
export default {
  loginWithFacebook,
  loginWithFacebookSuccess,
  login,
  loginSuccess,
  loginFail,
  register,
  registerSuccess,
};
