import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Fotgot.module.css';

const Forgot = () => {
  return (
    <div className={styles.forgot_box}>
      <Link to="/Findpassword">
        <span className={styles.forgot_find}>아이디 찾기&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기</span>
      </Link>
      <span>&nbsp;&nbsp;&nbsp;|</span>
      <Link to="/register">
        <span className={styles.forgot_find}>&nbsp;&nbsp;&nbsp;&nbsp;회원가입</span>
      </Link>
    </div>
  );
};

export default Forgot;
