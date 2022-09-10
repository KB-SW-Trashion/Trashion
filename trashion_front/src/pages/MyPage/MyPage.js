import React, { useEffect } from 'react';
import { Navbar, Footer, Product } from 'components';
import styles from './MyPage.module.css';
import Fab from '@mui/material/Fab';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'store';
import user from 'api/userInfo';
import { userInfoState } from 'store';
import { setCookie } from 'cookies-next';
import authApi from 'api/authApi';
import userimg from 'assets/image/userimg.png';

export default function MyPage() {
  const userAuth = useRecoilValue(authState);
  // eslint-disable-next-line no-unused-vars
  const [, setUser] = useRecoilState(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const user_id = userAuth.user_id;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.getUser().then(() => {
      setUser({
        isLoggedIn: false,
        access_token: setCookie(-1),
        refresh_token: setCookie(-1),
      });
    });
    navigate('/');
  };

  const getUser = async () => {
    await user.getUserInfo(user_id).then((res) => {
      setUserInfo({
        nickname: res.data.nickname,
        social_profile: res.data.social_profile,
        following_amount: res.data.following_count,
        follower_amount: res.data.follower_count,
        height: res.data.profile.height,
        weight: res.data.profile.weight,
        top_size: res.data.profile.top_size,
        bottom_size: res.data.profile.bottom_size,
        introduce: res.data.profile.introduce,
        like_item_count: res.data.like_item_count,
        sold_out_count: res.data.sold_out_count,
        profile_image: res.data.profile_image.photo,
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  let profile_img;

  if (userInfo.social_profile) {
    profile_img = userInfo.social_profile;
  } else if (userInfo.profile_image) {
    profile_img = userInfo.profile_image;
  } else {
    profile_img = userimg;
  }

  return (
    <div>
      <Navbar />

      <div className={styles.MyPage_bodybox}>
        <div className={styles.MyPage_bodyleft}>
          <div className={styles.Mypage_profileImgbox}>
            <img className={styles.Mypage_profileImg} src={profile_img} />
          </div>
        </div>
        <div className={styles.MyPage_bodyright}>
          <div className={styles.Mypage_profilecontentsbox}>
            <h2>{userInfo.nickname} </h2>
            <h3> {userInfo.introduce} </h3>
            <div className={styles.Mypage_profilecontentsboxinner}>
              <div className={styles.Mypage_profilecontentsboxinnerright}>
                <p> 팔로워 : {userInfo.follower_amount}</p>
                <p> 키 : {userInfo.height}</p>
                <p> 상의사이즈 : {userInfo.top_size}</p>
                <p> 거래완료수 : {userInfo.sold_out_count}</p>
              </div>
              <div>
                <p> 팔로잉 : {userInfo.following_amount}</p>
                <p> 몸무게 : {userInfo.weight}</p>
                <p> 하의사이즈 : {userInfo.bottom_size}</p>
                <p> 내가 찜한 아이템 : {userInfo.like_item_count}</p>
              </div>
            </div>
          </div>
          <div className={styles.Mypage_buttonbox}>
            <Link to="/New_Profile">
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
