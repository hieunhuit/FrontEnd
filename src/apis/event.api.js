import axiosService from '../common/axiosService';
import { API_ENDPOINT } from '../constants/index';
import qs from 'query-string';
const url_event = 'events';

export const _getEvents = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url_event}${queryParams}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _getDetailEvent = (params) => {
  const { sid, cid } = params;
  return axiosService.get(`${API_ENDPOINT}/${url_event}/${sid}/${cid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _deleteAllEvent = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.delete(`${API_ENDPOINT}/${url_event}${queryParams}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
export const _deleteSelectedEvents = (selectedEvents) => {
  selectedEvents = selectedEvents.join('#');
  return axiosService.post(
    `${API_ENDPOINT}/${url_event}`,
    { selectedEvents },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};
