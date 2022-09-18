import React from 'react';
import styles from './Chatlog.module.css';
import userimg from 'assets/image/userimg.png';

const ChatIndiv = ({ chat, onClick }) => {
  return (
    <div className={styles.chatItem} onClick={onClick}>
      <div className={styles.Mypage_profileImgbox}>{chat.user_img ? <img className={styles.Mypage_profileImg} src={chat.user_img} /> : <img className={styles.Mypage_profileImg} src={userimg} />}</div>

      <div className={styles.chat_opponentInfo}>
        <div className={styles.chatItemHeader}>
          <div className={styles.chatlogboxleft}>{chat.username}</div>
          <div></div>
          <div className={styles.update_time}>{chat.last_date ? chat.last_date : '마지막시간'}</div>
        </div>
        <div className={styles.chatItemBottom}>
          <span className={styles.update_time}>{chat.last_message ? chat.last_message : '마지막 대화'}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatIndiv;
