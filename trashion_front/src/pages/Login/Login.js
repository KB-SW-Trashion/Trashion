import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitButton, Forgot } from 'components';
import axios from 'axios';
import styles from './Login.module.css';
import logo from '../../components/Navbar/Trashion_logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [errors, setErrors] = useState(false);
  const { replace } = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password1: pwd,
    };

    axios
      .post('/dj-rest-auth/login/', user)
      .then((res) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem('token', res.data.key);
          replace('/');
        } else {
          setUsername('');
          setPwd('');
          localStorage.clear();
          setErrors(true);
          console.log(errors);
        }
      })
      .catch((err) => {
        console.clear();
        console.log(err);
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      });
  };

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
        <form onSubmit={onSubmit}>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label htmlFor="username">아이디</label>
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input
                type="password"
                name="pwd"
                id="pwd"
                required
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
              <label htmlFor="pwd">비밀번호</label>
            </div>
          </div>
          <Forgot />
          <div className={styles.buttonBox}>
            <SubmitButton name="로그인" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
