import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
    like_item_count: 0,
    sold_out_count: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export default userInfoState;
