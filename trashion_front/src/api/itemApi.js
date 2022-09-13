import axios from './config';
import tokenConfig from './tokenConfig';

export default {
  create(data) {
    return axios.post('/item_post/item/', data);
  },
  getProductInfo(item_id) {
    return axios.get('/item_post/item/' + item_id);
  },
  delete(id) {
    return axios.delete(`/item_post/item/${id}`, tokenConfig());
  },
  editProduct(id, data) {
    return axios.patch(`/item_post/item/${id}/`, data, tokenConfig());
  },
  getMyItem(id) {
    return axios.get(`/item_post/item/my_item/?user_id=${id}`, tokenConfig());
  },
};
