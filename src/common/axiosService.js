import axios from 'axios';
class AxiosService {
  constructor() {
    const instance = axios.create();
    this.instance = instance;
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }
  handleSuccess = (response) => {
    return response;
  };
  handleError = (error) => {
    return Promise.reject(error);
  };
  get(url) {
    return this.instance.get(url);
  }
  post(url, body) {
    console.log('post');
    return this.instance.post(url, body);
  }
  put(url, body) {
    return this.instance.put(url, body);
  }
  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();
