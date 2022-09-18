import axios from './config';
import tokenConfig from './tokenConfig';

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
  isLiked(item_id) {
    return axios.get(`relationship/is_liked/?item_id=${item_id}`, tokenConfig());
  },
};
