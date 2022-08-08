import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton, ID, Password } from 'components';
import styles from './Register.module.css';
import logo from '../../components/Navbar/Trashion_logo.png';

const Register = () => {
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
        <Password name="비밀번호 확인" />
        <ID name="이메일" />
        <div className={styles.buttonBox}>
          <SubmitButton name="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default Register;
