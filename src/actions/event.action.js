import * as types from '../constants/actionType.constants';
const getEvents = (query = {}) => {
  return {
    type: types.GET_EVENTS,
    payload: {
      query,
    },
  };
};

const getEventsSuccess = (data) => {
  return {
    type: types.GET_EVENTS_SUCCESS,
    payload: {
      data,
    },
  };
};
const getDetailEvent = (params = {}) => {
  return {
    type: types.GET_DETAIL_EVENT,
    payload: {
      params,
    },
  };
};
const getDetailEventSuccess = (data) => {
  return {
    type: types.GET_DETAIL_EVENT_SUCCESS,
    payload: {
      data,
    },
  };
};
const setSelectedEvent = (newSelected) => {
  return {
    type: types.SET_SELECTED_EVENT,
    payload: {
      newSelected,
    },
  };
};

export default { getEvents, getEventsSuccess, setSelectedEvent, getDetailEvent, getDetailEventSuccess };
