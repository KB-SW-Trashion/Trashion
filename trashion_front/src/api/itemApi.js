import axios from './config';
import tokenConfig from './tokenConfig';

export default {
  create(data) {
    return axios.post('/item_post/item/', data);
  },
  getProductInfo(item_id) {
    return axios.get('/item_post/item/' + item_id);
  },
  getProduct() {
    return axios.get('/item_post/item');
  },
  delete(id) {
    return axios.delete(`/item_post/item/${id}`, tokenConfig());
  },
  editProduct(id, data) {
    return axios.patch(`/item_post/item/${id}/`, data, tokenConfig());
  },
  getMyItem(id) {
    return axios.get(`/item_post/item/my_item/?user_id=${id}`);
  },
  getfilteredItem(cityId, guId, dongId, bigCategory, smallCategory) {
    if (bigCategory && smallCategory)
      return axios.get(
        `item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}&category_id__big_category=${bigCategory}&category_id__small_category=${smallCategory}`,
      );
    else if (bigCategory && !smallCategory)
      return axios.get(
        `item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}&category_id__big_category=${bigCategory}`,
      );
    else return axios.get(`item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}`);
  },
  getItem(id) {
    return axios.get('/item_post/item');
  },
};
