import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progessbar } from 'components';
import styles from './Findpassword.module.css';
import auth from 'api/authApi';
import logo from '../../assets/image/logo.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import user from 'api/userInfo';
import { authState } from 'store';
import { userInfoState } from 'store';
import Fab from '@mui/material/Fab';

export default function Findpassword() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userAuth = useRecoilValue(authState);
  const email = userAuth.email;
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  auth.login(user).then((res) => {
    if (res.data.access_token) {
      navigate('/');
    } else {
      alert('인증되지 않은 회원입니다.');
      navigate('/login');
    }
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.area}>
          <div className={styles.link_wrap}>
            <div className={styles.home} onClick={() => navigate('/')}>
              <img src={logo} />
            </div>
          </div>
          <div className={styles.Findpassword_Title}>비밀번호찾기</div>
          <div className={styles.loadingBox}>{isLoading && <Progessbar />}</div>
          <div className={styles.wrap_input}>
            <div className={styles.int_area}>
              <input type="text" name="email" id="email" required value={email} />
              <label htmlFor="email">이메일</label>
              {emailError && <div className={styles.invalid_input}>이메일 형식에 맞게 입력 해 주세요.</div>}
            </div>
          </div>
          <Fab variant="extended" sx={{ width: '400px', bgcolor: '#f8bbd0', mt: '3rem', mr: '35px', ml: '35px', fontWeight: 'bolder' }}>
            이메일인증하기
          </Fab>
        </div>
      </div>
    </div>
  );
}
