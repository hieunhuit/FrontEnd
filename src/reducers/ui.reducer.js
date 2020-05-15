import * as types from '../constants/actionType.constants';
const initialState = {
  loading: false,
  callSuccess: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.HIDE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.SET_STATUS_CALL_API: {
      const { status } = action.payload;
      return {
        ...state,
        callSuccess: status,
      };
    }
    default:
      return state;
  }
};
export default uiReducer;
