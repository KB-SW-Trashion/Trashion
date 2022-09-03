import axios from './config';

export default {
  follow(target) {
    return axios.post('relationship/follow/', target);
  },
  like(target) {
    return axios.post('relationship/like/', target);
  },
  block(target) {
    return axios.post('relationship/block/', target);
  },
};
