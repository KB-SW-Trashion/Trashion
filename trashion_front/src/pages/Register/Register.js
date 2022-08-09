import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton, ID, Password } from 'components';
import styles from './Register.module.css';
import logo from '../../components/Navbar/Trashion_logo.png';

const Register = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.area}>
        <div className={styles.link_wrap}>
          <Link to="/">
            <div className={styles.home}>
              <img src={logo} />
            </div>
          </Link>
        </div>
        <div className={styles.wrap_input}>
          <ID name="아이디" />
        </div>
        <div className={styles.wrap_input}>
          <Password name="비밀번호" />
        </div>
        <div className={styles.wrap_input}>
          <Password name="비밀번호 확인" />
        </div>
        <div className={styles.wrap_input}>
          <ID name="이메일" />
        </div>

        <div className={styles.buttonBox}>
          <SubmitButton name="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default Register;
