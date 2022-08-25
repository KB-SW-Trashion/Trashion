import { atom } from 'recoil';
// recoil : 전역 상태관리 라이브러리
// atom : 하나의 state를 담고 있는 전역 bubble => 컴포넌트 간 state 공유 가능

const authState = atom({
  key: 'authState', // atom를 지칭할 수 있는 unique ID
  default: {
    // 초기값 설정
    isLoggedIn: false,
    name: '',
    email: '',
    social_img: '',
    user_id: '',
    access_token: '',
    refresh_token: '',
  },
});

export default authState;
