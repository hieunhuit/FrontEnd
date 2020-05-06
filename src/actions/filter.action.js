import * as types from '../constants/actionType.constants';

const setPriority = (sig_priority) => {
  return {
    type: types.SET_FILTER_PRIORITY,
    payload: {
      sig_priority,
    },
  };
};
const setProtocol = (ip_proto) => {
  return {
    type: types.SET_FILTER_PROTOCOL,
    payload: {
      ip_proto,
    },
  };
};
const setSensor = (sid) => {
  return {
    type: types.SET_FILTER_SENSOR,
    payload: {
      sid,
    },
  };
};
const setCurrentPage = (page) => {
  return {
    type: types.SET_CURRENT_PAGE,
    payload: {
      page: page,
    },
  };
};
const setRowPerPage = (limit) => {
  return {
    type: types.SET_ROW_PER_PAGE,
    payload: {
      limit: limit,
    },
  };
};
const setSearchTerm = (searchTerm) => {
  return {
    type: types.SET_FILTER_SEARCH,
    payload: {
      searchTerm,
    },
  };
};
const setStart = (timestamp) => {
  return {
    type: types.SET_START,
    payload: {
      timestamp,
    },
  };
};
const setEnd = (timestamp) => {
  return {
    type: types.SET_END,
    payload: {
      timestamp,
    },
  };
};
export default {
  setCurrentPage,
  setPriority,
  setProtocol,
  setRowPerPage,
  setSearchTerm,
  setSensor,
  setStart,
  setEnd,
};
