import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitButton } from 'components';
import styles from '../Login/Login.module.css';
import logo from '../../assets/image/logo.png';
import auth from 'api/authApi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [nickname, setNickname] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [errors, setErrors] = useState(false);
  const { replace } = useNavigate();

  const onChangeUsername = (e) => {
    const usernameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!e.target.value || usernameRegex.test(e.target.value)) setUsernameError(false);
    else setUsernameError(true);
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!e.target.value || passwordRegex.test(e.target.value)) setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const validation = () => {
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!email) setEmailError(true);

    if (password && confirmPassword && email) return true;
    else return false;
  };

  const onSubmit = (e) => {
    if (validation()) return;
    e.preventDefault();
    const user = {
      username: username,
      password1: password,
      password2: confirmPassword,
      email: email,
    };

    auth
      .register(user)
      .then((res) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem('token', res.data.key);
          replace('/');
        } else {
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
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
              <input type="text" name="email" id="email" required value={email} onChange={onChangeEmail} />
              <label htmlFor="email">이메일</label>
              {emailError && <div className={styles.invalid_input}>이메일 형식에 맞게 입력 해 주세요.</div>}
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input type="text" name="username" id="username" required value={username} onChange={onChangeUsername} />
              <label htmlFor="username">닉네임</label>
              {usernameError && <div className={styles.invalid_input}>닉네임 형식에 맞게 입력 해 주세요.</div>}
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input type="password" name="pwd" id="pwd" required value={password} onChange={onChangePassword} />
              <label htmlFor="pwd">
                비밀번호 <span>(대·소문자, 숫자, 특수문자 포함 8~16자)</span>
              </label>
              {passwordError && <div className={styles.invalid_input}>비밀번호 형식에 맞게 입력 해 주세요.</div>}
            </div>
          </div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input type="password" name="pwdCheck" id="pwdCheck" required value={confirmPassword} onChange={onChangeConfirmPassword} />
              <label htmlFor="pwdCheck">비밀번호 확인</label>
              {confirmPasswordError && <div className={styles.invalid_input}>비밀번호와 일치하지 않습니다.</div>}
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
