import React from 'react';
import { Link } from 'react-router-dom';
import './Forgot.css';

const Forgot = () => {
  return (
    <div className="forgotBox">
      <Link to="/">
        <span className="find">
          아이디 찾기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 찾기
        </span>
      </Link>
    </div>
  );
};

export default Forgot;
