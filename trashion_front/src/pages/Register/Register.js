import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitButton } from 'components';
import axios from 'axios';
import styles from '../Login/Login.module.css';
import logo from '../../components/Navbar/Trashion_logo.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [email, setEmail] = useState('');
  // const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState(false);
  const { replace } = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password1: pwd,
      password2: pwdCheck,
      email: email,
    };

    axios
      .post('/dj-rest-auth/registration/', user)
      .then((res) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem('token', res.data.key);
          replace('/');
        } else {
          setUsername('');
          setEmail('');
          setPwd('');
          setPwdCheck('');
          localStorage.clear();
          setErrors(true);
          console.log(errors);
          console.log(res);
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
                pattern="^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[a-z\d$@$!%*#?&]{8,16}$"
                required
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
              <label htmlFor="pwd">
                비밀번호 <span>(소문자, 숫자, 특수문자 포함 8~16자)</span>
              </label>
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input
                type="password"
                name="pwdCheck"
                id="pwdCheck"
                pattern="^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[a-z\d$@$!%*#?&]{8,16}$"
                required
                value={pwdCheck}
                onChange={(e) => {
                  setPwdCheck(e.target.value);
                }}
              />
              <label htmlFor="pwdCheck">비밀번호 확인</label>
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email">이메일</label>
            </div>
          </div>
          {/* <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input
                type="text"
                name="nickname"
                id="nickname"
                autoComplete="off"
                required
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <label htmlFor="nickname">닉네임</label>
            </div>
          </div> */}

          <div className={styles.buttonBox}>
            <SubmitButton name="회원가입" />
          </div>
          {errors === true && <h2>Cannot signup with provided credentials</h2>}
        </form>
      </div>
    </div>
  );
};

export default Register;
