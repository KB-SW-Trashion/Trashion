import axios from './config';

export default {
  getReview() {
    return axios.get('/review/');
  },
};
