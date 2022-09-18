import axios from './config';
import tokenConfig from './tokenConfig';

export default {
  getCustomerChatting(data) {
    return axios.get('/chat/get_send_chat_list/', tokenConfig());
  },
  getSellerChatting() {
    return axios.get('/chat/get_item_chat_list/', tokenConfig());
  },
  createChatRoom(data) {
    return axios.post('/chat/create_chat_room/', data, tokenConfig());
  },
};
