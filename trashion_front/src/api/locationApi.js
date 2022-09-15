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
        `item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}&category_id__big_category=${bigCategory}&category_id__small_category=${smallCategory}`,
      );
    else if (bigCategory && !smallCategory)
      return axios.get(
        `item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}&category_id__big_category=${bigCategory}`,
      );
    else return axios.get(`item_post/item/?&location_item_sets__location_id__city=${cityId}&location_item_sets__location_id__gu=${guId}&location_item_sets__location_id__dong=${dongId}`);
  },
};
