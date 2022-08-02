import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton, ID, Password, Forgot } from 'components';
import './Login.css';
import logo from '../../components/Navbar/Trashion_logo.png';

function Login() {
  return (
    <div className="wrap">
      <div className="loginArea">
        <Link to="/">
          <div className="home">
            <img src={logo} />
          </div>
        </Link>

        <ID />
        <Password />
        <Forgot />
        <div className="buttonBox">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
