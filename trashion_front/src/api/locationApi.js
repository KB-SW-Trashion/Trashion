import axios from './config';

export default {
  getLocationId() {
    return axios.get('item_post/locationset');
  },
  getLocation(locationId) {
    return axios.get(`item_post/location/${locationId}`);
  },
};
