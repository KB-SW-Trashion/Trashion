import { atom } from 'recoil';

// date, title, content, price, size, condition, category, period
const productState = atom({
  key: 'productState',
  default: {
    id: 0,
    date: new Date(),
    title: '',
    content: '',
    price: '',
    size: '',
    condition: '',
    category: '',
    period: '',
    post_type: '',
  },
});

export default productState;
