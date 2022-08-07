import axios from './config';

export default {
  kakaoAuthenticate(data) {
    return axios.post('accounts/kakao/authenticate/', data);
  },
  googleAuthenticate(data) {
    return axios.post('accounts/google/authenticate/', data);
  },
};
