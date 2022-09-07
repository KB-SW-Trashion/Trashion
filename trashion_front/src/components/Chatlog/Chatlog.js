import React, { useEffect } from 'react';
import { userInfoState } from 'store';
import styles from './Chatlog.module.css';
import { authState } from 'store';
import user from 'api/userInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timeForToday } from 'utils/timeforToday';
import userimg from 'assets/image/userimg.png';

const Chatlog = (chat) => {
  const userAuth = useRecoilValue(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const email = userAuth.email;

  var selected_date = new Date(chat.updated_at);
  const updated_time = timeForToday(selected_date);

  const getUser = async () => {
    await user.getUserInfo(email).then((res) => {
      console.log(res.data);
      setUserInfo({
        nickname: res.data.nickname,
        social_profile: res.data.social_profile,
      });
      console.log(userInfo);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const userProfileImg = userInfo.social_profile;

  return (
    <div className={styles.chatlogbox}>
      <div className={styles.Mypage_profileImgbox}>
        {userProfileImg ? <img className={styles.Mypage_profileImg} src={userInfo.social_profile} /> : <img className={styles.Mypage_profileImg} src={userimg} />}
      </div>
      <div>
        <div className={styles.chat_opponentInfo}>
          <div className={styles.chatlogboxleft}>{userInfo.nickname}ㅇ름이름이름</div>

          <div className={styles.chatlogboxright}>
            <span className={styles.update_time}>{updated_time}</span>
          </div>
        </div>
        <div className={styles.chatlogboxmiddle}>
          <div>{userInfo.nickname}</div>
          <div>마지막채팅</div>
        </div>
      </div>
    </div>
  );
};

export default Chatlog;
