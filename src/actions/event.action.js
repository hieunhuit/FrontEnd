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

const deleteAllEvent = (query) => {
  return {
    type: types.DELETE_ALL_EVENTS,
    payload: {
      query,
    },
  };
};
const deleteAllEventSuccess = (sid = '') => {
  return {
    type: types.DELETE_ALL_EVENTS_SUCCESS,
    payload: {
      sid,
    },
  };
};

const deleteSelectedEvent = (selectedEvents) => {
  return {
    type: types.DELETE_SELECTED_EVENT,
    payload: {
      selectedEvents,
    },
  };
};
const deleteSelectedEventSuccess = (selectedEvents) => {
  return {
    type: types.DELETE_SELECTED_EVENT_SUCCESS,
    payload: {
      selectedEvents,
    },
  };
};
const getEventLiveMode = (event_livemode) => {
  return {
    type: types.GET_EVENT_LIVEMODE,
    payload: {
      event_livemode,
    },
  }
};
const getStatisticalLiveMode = (statistical_livemode)=>{
  return {
    type: types.GET_STATISTICAL_LIVEMODE,
    payload: {
      statistical_livemode,
    }
  }
};
const clearLiveModeData = ()=>{
  return {
    type: types.GET_EVENT_LIVEMODE_CLEAR
  }
};
const getSysInfoLiveMode = (sysinfo_livemode)=>{
  return {
    type: types.GET_SYSINFO_LIVEMODE,
    payload: {
      sysinfo_livemode,
    }
  }
};
export default {
  getEvents,
  getEventsSuccess,
  setSelectedEvent,
  getDetailEvent,
  getDetailEventSuccess,
  deleteAllEvent,
  deleteAllEventSuccess,
  deleteSelectedEvent,
  deleteAllEventSuccess,
  deleteSelectedEvent,
  deleteSelectedEventSuccess,
  getEventLiveMode,
  getStatisticalLiveMode,
  clearLiveModeData,
  getSysInfoLiveMode,
};
