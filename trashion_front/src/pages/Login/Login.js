import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitButton, Forgot, KakaoLoginButton, Progessbar } from 'components';
import styles from './Login.module.css';
import auth from 'api/authApi';
import logo from '../../assets/image/logo.png';
import getKakaoToken from 'api/socialLoginApi';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRecoilState } from 'recoil';
import { authState } from 'store';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useRecoilState(authState);

  const onChangeEmail = (e) => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    auth
      .login(user)
      .then((res) => {
        if (res.data.access_token) {
          saveUserInfo(res.data.access_token, res.data.refresh_token);
        } else {
          alert('인증되지 않은 회원입니다.');
          navigate('/login');
        }
      })
      .catch((err) => {
        console.clear();
        console.log(err);
        alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
      });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const saveUserInfo = async (access, refresh) => {
    setIsLoading(true);
    setCookie('access_token', access);
    setCookie('refresh_token', refresh);
    await auth
      .getUser()
      .then((res) => {
        setUser({
          isLoggedIn: true,
          name: res.data.nick_name,
          email: res.data.email,
          social_img: res.data.social_img,
          user_id: res.data.id,
          access_token: access,
          refresh_token: refresh,
        });

        setIsLoading(false);
        navigate('/');
        console.log('auth', res.data);
      })
      .catch((e) => {
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        console.log(e);
        // alert('로그인이 실패했습니다 다시 시도해주세요!');
      });
  };
  const kakaoSocialLogin = async (code) => {
    setIsLoading(true);
    await getKakaoToken(REST_API_KEY, REDIRECT_URI, code)
      .then((res) => res.json())
      .then((data) => {
        console.log('??', data);
        if (data.access_token) {
          auth
            .kakaoAuthenticate({ access_token: data.access_token, code: code })
            .then((res) => {
              console.log('카카오로그인 성공', res.data);
              saveUserInfo(res.data.access_token, res.data.refresh_token);
            })
            .catch((err) => console.log('실패', err));
        } else {
          alert('인증되지 않은 회원입니다.');
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      kakaoSocialLogin(code);
    } else {
      console.log('헿');
    }
  }, []);

  const getGoogleToken = () => {
    gapi.client.init({
      clientID,
      scope: 'email',
    });
  };
  useEffect(() => {
    gapi.load('client:auth2', getGoogleToken);
  }, []);

  const googleSocialLogin = async (data) => {
    setIsLoading(true);
    await auth
      .googleAuthenticate(data)
      .then((res) => {
        saveUserInfo(res.data.access_token, res.data.refresh_token);
        console.log('데이터', res);
      })
      .catch((err) => console.log(err));
  };

  const onSuccess = (response) => {
    console.log(response);
    const data = {
      code: response.tokenId,
      access_token: response.accessToken,
      email: response.profileObj.email,
      profile_image: response.profileObj.imageUrl,
      name: response.profileObj.name,
    };
    console.log('구글로그인 시도!', data);
    googleSocialLogin(data);
    // const {
    //   googleId,
    //   profileObj: { email, name },
    // } = response;
    // await onSocial({
    //     socialId : googleId,
    //     socialType : 'google',
    //     email,
    //     nickname : name
    // });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.area}>
        <div className={styles.link_wrap}>
          <div className={styles.home} onClick={() => navigate('/')}>
            <img src={logo} />
          </div>
        </div>
        <div className={styles.loadingBox}>{isLoading && <Progessbar />}</div>
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
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                maxLength={16}
                minLength={8}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="password">비밀번호</label>
            </div>
          </div>
          <Forgot />
          <div className={styles.social_login_wrap}>
            <KakaoLoginButton kakaoLogin={kakaoLogin} />
          </div>
          <div className={styles.social_login_wrap}>
            <div className={styles.google_login}>
              <GoogleLogin clientId={clientID} buttonText={'구글 로그인'} onSuccess={onSuccess} responseType={'id_token'} onFailure={onFailure} />
            </div>
          </div>
          <div className={styles.buttonBox}>
            <SubmitButton name="로그인" onSubmit={onSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
