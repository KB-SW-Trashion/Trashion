import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: {
    bigCategory: '',
    smallCategory: '',
  },
});

export default categoryState;
