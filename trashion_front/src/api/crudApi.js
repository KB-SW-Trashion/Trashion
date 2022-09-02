import axios from './config';

export default {
  create(data) {
    return axios.post('/item_post/item/', data);
  },
  getProductInfo(item_id) {
    return axios.get('/item_post/item/' + item_id);
  },
};
