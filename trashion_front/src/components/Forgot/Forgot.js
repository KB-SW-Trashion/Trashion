import React from 'react';
import { Link } from 'react-router-dom';
import './Forgot.css';

const Forgot = () => {
  return (
    <div className="forgot-box">
      <Link to="/">
        <span className="forgot-find">아이디 찾기&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기</span>
      </Link>
      <span>&nbsp;&nbsp;&nbsp;|</span>
      <Link to="/register">
        <span className="forgot-find register">&nbsp;&nbsp;&nbsp;&nbsp;회원가입</span>
      </Link>
    </div>
  );
};

export default Forgot;
