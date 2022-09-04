import React, { useEffect } from 'react';
import Authorized from 'routes/Authorized';
import Unauthorized from 'routes/Unauthorized';
import './App.css';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import authApi from 'api/authApi';
import { getCookie } from 'cookies-next';

function App() {
  const [, setUser] = useRecoilState(authState);

  const getUserInfo = async () => {
    await authApi.getUser().then((res) => {
      setUser({
        isLoggedIn: true,
        name: res.data.nick_name,
        email: res.data.email,
        social_img: res.data.social_img,
        user_id: res.data.id,
        access_token: getCookie('access_token'),
        refresh_token: getCookie('refresh_token'),
      });
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Authorized />
      <Unauthorized />
    </div>
  );
}

export default App;
