import * as types from '../constants/actionType.constants';
const initialState = {
  errorMsg: '',
};
const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_FAIL: {
      const { msg } = action.payload;
      return {
        ...state,
        errorMsg: msg,
      };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    default:
      return state;
  }
};
export default authenReducer;
