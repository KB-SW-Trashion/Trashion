import { atom } from 'recoil';

// date, title, content, price, size, condition, category, period

const productState = atom({
  key: 'productState',
  default: {
    user_id: 1,
    category_id: 0,
    city: '',
    gu: '',
    dong: '',
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
