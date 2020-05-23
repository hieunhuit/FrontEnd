import * as types from '../constants/actionType.constants';

const register = (data, history) => {
  return {
    type: types.REGISTER,
    payload: {
      data,
      history,
    },
  };
};
const registerSuccess = () => {
  return {
    type: types.REGISTER_SUCCESS,
  };
};
export default {
  register,
  registerSuccess,
};
