import axiosService from '../common/axiosService';
import { API_ENDPOINT } from '../constants/index';
import axios from 'axios';
import qs from 'query-string';
const url_interface = 'interfaces';
export const _getInterface = (params = {}) => {
  return axiosService.get(`${API_ENDPOINT}/${url_interface}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
export const _toggleStatusInterface = (sid, status) => {
  console.log({ sid, status });
  return axiosService.post(
    `${API_ENDPOINT}/${url_interface}/${sid}`,
    { status: status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};
export const _createInterface = (data) => {
  const { interfaceName, description } = data;
  return axiosService.post(
    `${API_ENDPOINT}/${url_interface}`,
    { interfaceName, description },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};
export const _deleteInterface = (sid) => {
  return axiosService.delete(`${API_ENDPOINT}/${url_interface}/${sid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _getRules = (sid) => {
  return axiosService.get(`${API_ENDPOINT}/${url_interface}/${sid}/rules`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _deleteRule = (sid, id) => {
  return axiosService.delete(`${API_ENDPOINT}/${url_interface}/${sid}/rules/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
export const _createRule = (sid, rule) => {
  return axiosService.post(
    `${API_ENDPOINT}/${url_interface}/${sid}/rules`,
    { rules: rule },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};
export const _updateRule = (rule, ruleEditing) => {
  return axiosService.put(
    `${API_ENDPOINT}/${url_interface}/${ruleEditing.sid}/rules/${ruleEditing.id}`,
    {
      rule: rule,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};
