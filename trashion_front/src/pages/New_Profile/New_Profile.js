import React from 'react';
import { ProfileEditor, Navbar } from 'components';
import styles from '../MyPage/MyPage.module.css';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store';

export default function New_Profile() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

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
          <ProfileEditor />
        </div>
      </div>
    </div>
  );
}
