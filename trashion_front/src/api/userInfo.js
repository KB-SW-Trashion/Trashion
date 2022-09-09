import axios from './config';

export default {
  getUserEmail(id) {
    return axios.get('/dj-rest-auth/user' + id);
  },

  getUserInfo(user_id) {
    return axios.get('/accounts/detail/' + user_id);
  },

  editUserInfo(user_id, data) {
    return axios.patch('/accounts/detail/' + user_id, data);
  },
};
