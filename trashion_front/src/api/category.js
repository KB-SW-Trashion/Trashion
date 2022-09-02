import axios from './config';

export default {
  postCategory(category) {
    return axios.post('item_post/category/', category);
  },

  getCategoryId() {
    return axios.get('item_post/category/');
  },
};
