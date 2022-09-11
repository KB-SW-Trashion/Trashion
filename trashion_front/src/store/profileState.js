import { atom } from 'recoil';

const profileState = atom({
  key: 'profileState',
  default: {
    introduce: '',
    profile_image: [],
    top_size: '',
    bottom_size: '',
    height: '',
    weight: '',
  },
  dangerouslyAllowMutability: true,
});

export default profileState;
