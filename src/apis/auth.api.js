import axiosService from '../common/axiosService';
import { API_ENDPOINT } from '../constants/index';

const url_auth_fb = 'auth/facebook/callback';
const url_auth = 'auth/local';

export const _loginWithFacebook = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url_auth_fb}`, { user: data });
};
export const _login = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url_auth}`, data);
};
