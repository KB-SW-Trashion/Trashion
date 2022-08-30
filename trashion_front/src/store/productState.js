import { atom } from 'recoil';

// date, title, content, price, size, condition, category, period
const productState = atom({
  key: 'productState',
  default: {
    title: '',
    content: '',
    price: '',
    size: '',
    condition: '',
    big_category: '',
    small_category: '',
    photos_data: [],
    style_photos_data: [],
    period: '',
    height: '',
    weight: '',
  },
});

export default productState;
