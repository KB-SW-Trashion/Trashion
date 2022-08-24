import axios from './config';
import tokenConfig from './tokenConfig';

export default {
  kakaoAuthenticate(data) {
    return axios.post('accounts/kakao/authenticate/', data);
  },
  googleAuthenticate(data) {
    return axios.post('accounts/google/authenticate/', data);
  },
  login(data) {
    return axios.post('dj-rest-auth/login/', data);
  },
  getUser() {
    return axios.get('dj-rest-auth/user/', tokenConfig());
  },
  register(data) {
    axios.post('/dj-rest-auth/registration/', data);
  },
};
