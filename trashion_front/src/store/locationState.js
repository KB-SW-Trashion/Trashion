import { atom } from 'recoil';

const locationState = atom({
  key: 'locationState',
  default: {
    city: '',
    gu: '',
    dong: '',
  },
});

export default locationState;
