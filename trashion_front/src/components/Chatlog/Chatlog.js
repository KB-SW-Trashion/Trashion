import React, { useEffect, useState } from 'react';
// import { userInfoState } from 'store';
import styles from './Chatlog.module.css';
import { authState } from 'store';
// import user from 'api/userInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timeForToday } from 'utils/timeforToday';
import ChatIndiv from './ChatIndiv';

const Chatlog = ({ chatList, setRoom }) => {
  const userAuth = useRecoilValue(authState);
  // const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // const [chatList, setChatList] = useState([]);
  // const email = userAuth.email;

  // var selected_date = new Date(chat.updated_at);
  // const updated_time = timeForToday(selected_date);

  useEffect(() => {}, []);
  console.log('뭐야시불', chatList);
  // const userProfileImg = userInfo.social_profile;

  return (
    <div className={styles.chatlogbox}>
      {chatList.map((item) => (
        <ChatIndiv key={item.id} chat={item} onClick={setRoom(item)} />
      ))}
    </div>
  );
};

export default Chatlog;
