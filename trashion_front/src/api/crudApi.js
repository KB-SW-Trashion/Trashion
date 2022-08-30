import axios from './config';

export default {
  create(data) {
    return axios.post('/item_post/item/', data);
  },
};
