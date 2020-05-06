import * as types from '../constants/actionType.constants';

const initialState = {
  sig_priority: '',
  ip_proto: '',
  sid: '',
  page: 1,
  limit: 10,
  sig_name: '',
  start: null,
  end: Date.now(),
};
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTER_PRIORITY: {
      const { sig_priority } = action.payload;
      return {
        ...state,
        sig_priority,
      };
    }
    case types.SET_FILTER_SENSOR: {
      const { sid } = action.payload;
      return {
        ...state,
        sid,
      };
    }
    case types.SET_FILTER_PROTOCOL: {
      const { ip_proto } = action.payload;
      return {
        ...state,
        ip_proto,
      };
    }
    case types.SET_CURRENT_PAGE: {
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    }
    case types.SET_ROW_PER_PAGE: {
      const { limit } = action.payload;
      return {
        ...state,
        limit,
      };
    }
    case types.SET_FILTER_SEARCH: {
      const { searchTerm } = action.payload;
      return {
        ...state,
        sig_name: searchTerm,
      };
    }
    case types.SET_START: {
      const { timestamp } = action.payload;
      return {
        ...state,
        start: timestamp,
      };
    }
    case types.SET_END: {
      const { timestamp } = action.payload;
      return {
        ...state,
        end: timestamp,
      };
    }

    default:
      return state;
  }
};
export default filterReducer;
