import axios from './config';

export default {
  getLocationId() {
    return axios.get('item_post/locationset');
  },
  getLocation(locationId) {
    return axios.get(`item_post/location/${locationId}`);
  },
  getfilteredItem(cityId, guId, dongId) {
    return axios.get(`item_post/item/location_item/?&city=${cityId}&gu=${guId}&dong=${dongId}`);
  },
};
