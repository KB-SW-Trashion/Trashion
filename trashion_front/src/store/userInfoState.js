import { atom } from 'recoil';

const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    following_amount: 0,
    follower_amount: 0,
    height: 0,
    weight: 0,
    top_size: '',
    bottom_size: '',
    introduce: '',
  },
});

export default userInfoState;
