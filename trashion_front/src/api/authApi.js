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
  updateUserInfo(data, config) {
    return axios.post('/accounts/update_user_info/', data, config);
  },
};
