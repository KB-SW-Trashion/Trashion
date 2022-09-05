import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// date, title, content, price, size, condition, category, period

const { persistAtom } = recoilPersist();

const productState = atom({
  key: 'productState',
  default: {
    id: 0,
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
    photos: [],
    style_photos: [],
    height: '',
    weight: '',
  },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});

export default productState;
