import React from 'react';
import styles from './style.module.css';
import kakaoimg from 'assets/image/kakaoimg.png';

export default function kakaoLoginButton({ kakaoLogin }) {
  return (
    <div>
      <button onClick={kakaoLogin} className={styles.kakao}>
        {/* <img src={process.env.PUBLIC_URL + '/images/kakao/kakao_icon.png'} /> */}
        <img width="300px" height="46px" src={kakaoimg}></img>
      </button>
    </div>
  );
}
