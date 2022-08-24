import axios from './config';

export default {
  kakaoAuthenticate(data) {
    return axios.post('accounts/kakao/authenticate/', data);
  },
  googleAuthenticate(data) {
    return axios.post('accounts/google/authenticate/', data);
  },
  login(data) {
    axios.post('/dj-rest-auth/login/', data);
  },
  register(data) {
    axios.post('/dj-rest-auth/registration/', data);
  },
};
