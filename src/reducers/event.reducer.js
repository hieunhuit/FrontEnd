import * as types from '../constants/actionType.constants';

const initialStage = {
  listEvent: [],
  pagination: '',
  selected: [],
  eventDetail: null,
};

const eventReducer = (state = initialStage, action) => {
  switch (action.type) {
    case types.GET_EVENTS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listEvent: data.data,
        pagination: data.pagination,
      };
    }
    case types.GET_DETAIL_EVENT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        eventDetail: data,
      };
    }
    case types.SET_SELECTED_EVENT: {
      const { newSelected } = action.payload;
      return {
        ...state,
        selected: newSelected,
      };
    }
    default:
      return state;
  }
};
export default eventReducer;
