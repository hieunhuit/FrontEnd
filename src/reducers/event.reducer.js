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
    case types.DELETE_ALL_EVENTS_SUCCESS: {
      const { sid } = action.payload;
      if (sid !== '') {
        return {
          ...state,
          listEvent: state.listEvent.filter((event) => event.sid !== sid),
          selected: [],
        };
      }

      return {
        ...state,
        listEvent: [],
        selected: [],
      };
    }
    case types.DELETE_SELECTED_EVENT_SUCCESS: {
      const { selectedEvents } = action.payload;

      return {
        ...state,
        selected: [],
        listEvent: state.listEvent.filter((event) => {
          return !selectedEvents.includes(`${event.sid}-${event.cid}`);
        }),
        pagination: {
          ...state.pagination,
          totalRows: state.pagination.totalRows - selectedEvents.length,
        },
      };
    }
    default:
      return state;
  }
};
export default eventReducer;
