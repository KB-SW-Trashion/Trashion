import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton, ID, Password } from 'components';
import './Register.css';
import logo from '../../components/Navbar/Trashion_logo.png';

const Register = () => {
  return (
    <div className="register-wrap">
      <div className="register-area">
        <Link to="/">
          <div className="register-home">
            <img src={logo} />
          </div>
        </Link>

        <ID name="아이디" />
        <Password name="비밀번호" />
        <Password name="비밀번호 확인" />
        <ID name="이메일" />
        <div className="register-buttonBox">
          <SubmitButton name="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default Register;
