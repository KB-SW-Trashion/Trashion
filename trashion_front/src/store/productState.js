import { atom } from 'recoil';

// date, title, content, price, size, condition, category, period

const productState = atom({
  key: 'productState',
  default: {
    user_id: 1,
    // city: '2',
    // gu: '312',
    // dong: '3123',
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
  dangerouslyAllowMutability: true,
});

export default productState;
