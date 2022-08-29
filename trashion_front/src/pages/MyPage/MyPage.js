import React, { useEffect } from 'react';
import { Navbar, Footer, Product } from 'components';
// import img_example from '../../img/img_example.jpg';
import styles from './MyPage.module.css';
import Fab from '@mui/material/Fab';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'store';
import user from 'api/userInfo';
import { userInfoState } from 'store';
import { setCookie } from 'cookies-next';
import authApi from 'api/authApi';

export default function MyPage() {
  const userAuth = useRecoilValue(authState);
  // eslint-disable-next-line no-unused-vars
  const [, setUser] = useRecoilState(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const email = userAuth.email;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.getUser().then((res) => {
      setUser({
        isLoggedIn: false,
        access_token: setCookie(-1),
        refresh_token: setCookie(-1),
      });
    });
    navigate('/');
  };

  const getUser = async () => {
    await user.getUserInfo(email).then((res) => {
      console.log(res.data);
      setUserInfo({
        nickname: res.data.nickname,
        social_profile: res.data.social_profile,
        following_amount: res.data.following_count,
        follower_amount: res.data.follower_count,
        height: res.data.profile.height,
        weight: res.data.profile.weight,
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.MyPage_bodybox}>
        <div className={styles.MyPage_bodyleft}>
          <div className={styles.Mypage_profileImgbox}>
            <img className={styles.Mypage_profileImg} src={userInfo.social_profile} />
          </div>
        </div>
        <div className={styles.MyPage_bodyright}>
          <div className={styles.Mypage_profilecontentsbox}>
            <h2>{userInfo.nickname} </h2>
            <h3> [자기소개] </h3>
            <div className={styles.Mypage_profilecontentsboxinner}>
              <div className={styles.Mypage_profilecontentsboxinnerright}>
                <p> 팔로워 : {userInfo.follower_amount}</p>
                <p> 키 : {userInfo.height}</p>
                <p> 상의사이즈 : [seller_size_top]</p>
                <p> 거래완료수 : [total_trade]</p>
              </div>
              <div>
                <p> 팔로잉 : {userInfo.following_amount}</p>
                <p> 몸무게 : {userInfo.weight}</p>
                <p> 하의사이즈 : [seller_size_bottom]</p>
                <p> 누적 좋아요 수 : [total_like]</p>
              </div>
            </div>
          </div>
          <div className={styles.Mypage_buttonbox}>
            <Link to="/">
              <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
                비밀번호 수정
              </Fab>
            </Link>
            <Link to="/">
              <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
                내 정보 수정
              </Fab>
            </Link>
            <Fab variant="extended" onClick={handleLogout} sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', fontWeight: 'bolder' }}>
              로그아웃
            </Fab>
          </div>
        </div>
      </div>
      <div className={styles.MyPage_list}>
        <p className={styles.MyPage_list_title}>내가 쓴 글</p>
        <hr className={styles.Mypage_hr} />
        <div>
          <Product></Product>
        </div>
      </div>

      <div className={styles.MyPage_footerbox}>
        <Footer />
      </div>
    </div>
  );
}
