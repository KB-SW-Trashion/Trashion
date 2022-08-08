import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton, ID, Password, Forgot } from 'components';
import styles from './Login.module.css';
import logo from '../../components/Navbar/Trashion_logo.png';

function Login() {
  return (
    <div className={styles.wrap}>
      <div className={styles.area}>
        <Link to="/">
          <div className={styles.home}>
            <img src={logo} />
          </div>
        </Link>

        <ID name="아이디" />
        <Password name="비밀번호" />
        <Forgot />
        <div className={styles.buttonBox}>
          <SubmitButton name="로그인" />
        </div>
      </div>
    </div>
  );
}

export default Login;
