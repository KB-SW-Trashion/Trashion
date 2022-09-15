import axios from './config';

export default {
  getLocationId() {
    return axios.get('item_post/locationset');
  },
  getLocation(locationId) {
    return axios.get(`item_post/location/${locationId}`);
  },
  getfilteredItem(cityId, guId, dongId, bigCategory, smallCategory) {
    if (bigCategory && smallCategory)
      return axios.get(
        `item_post/item/?&location_item_sets_location_id_city=${cityId}&location_item_sets_location_id_gu=${guId}&location_item_sets_location_id_dong=${dongId}&big_category=${bigCategory}&small_category=${smallCategory}`,
      );
    else if (bigCategory && !smallCategory)
      return axios.get(
        `item_post/item/?&location_item_sets_location_id_city=${cityId}&location_item_sets_location_id_gu=${guId}&location_item_sets_location_id_dong=${dongId}&big_category=${bigCategory}`,
      );
    else return axios.get(`item_post/item/?&location_item_sets_location_id_city=${cityId}&location_item_sets_location_id_gu=${guId}&location_item_sets_location_id_dong=${dongId}`);
  },
};
