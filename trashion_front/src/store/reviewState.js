import { atom } from 'recoil';

const reviewState = atom({
  key: 'reviewState',
  default: [],
  dangerouslyAllowMutability: true,
});

export default reviewState;
