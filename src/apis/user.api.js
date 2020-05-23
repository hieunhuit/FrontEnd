import axiosService from '../common/axiosService';
import { API_ENDPOINT } from '../constants/index';
const url_user = 'user';

export const _register = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url_user}`, { user: data });
};
