import React from 'react';
import styles from './style.module.css';

export default function kakaoLoginButton({ kakaoLogin }) {
  return (
    <button onClick={kakaoLogin} className={styles.kakao}>
      <img src={process.env.PUBLIC_URL + '/images/kakao/kakao_icon.png'} />
      Kakao 계정으로 시작하기
    </button>
  );
}
