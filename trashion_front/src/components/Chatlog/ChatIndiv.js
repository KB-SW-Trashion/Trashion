import React from 'react';
import styles from './Chatlog.module.css';
import userimg from 'assets/image/userimg.png';

const ChatIndiv = ({ chat }) => {
  return (
    <>
      <div className={styles.Mypage_profileImgbox}>{chat.user_img ? <img className={styles.Mypage_profileImg} src={chat.user_img} /> : <img className={styles.Mypage_profileImg} src={userimg} />}</div>
      <div>
        <div className={styles.chat_opponentInfo}>
          <div className={styles.chatlogboxleft}>{chat.username}</div>

          <div className={styles.chatlogboxright}>
            <span className={styles.update_time}>{chat.last_date}</span>
          </div>
        </div>
        <div className={styles.chatlogboxmiddle}>
          <div>{chat.username}</div>
          <div>마지막채팅</div>
        </div>
      </div>
    </>
  );
};

export default ChatIndiv;
