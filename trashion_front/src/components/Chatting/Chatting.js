import React, { useEffect, useState, useRef } from 'react';
import { userInfoState } from 'store';
import styles from './Chatting.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'store';
import user from 'api/userInfo';
import { ProfileImageUploader, Chatting_drop } from 'components';
import userimg from 'assets/image/userimg.png';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

const Chatting = ({ room }) => {
  // const userAuth = useRecoilValue(authState);
  const [userInfo] = useRecoilState(userInfoState);
  // const email = userAuth.email;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  let ws = useRef(null);
  //   var selected_date = new Date(chat.updated_at);
  //   const updated_time = timeForToday(selected_date);

  // const getUser = async () => {
  //   await user.getUserInfo(email).then((res) => {
  //     console.log(res.data);
  //     setUserInfo({
  //       nickname: res.data.nickname,
  //       social_profile: res.data.social_profile,
  //     });
  //     console.log(userInfo);
  //   });
  // };

  const connectSocket = (code) => {
    const webSocketUrl = `ws://${window.location.hostname}:8000/ws/chat/${code}/`;
    const socket = new WebSocket(webSocketUrl);
    ws.current = socket;
    ws.current.onopen = () => {
      console.log('WebSocket Client Connected');
      fetchMessage();
    };
    ws.current.onclose = (error) => {
      console.log('disconnect from ' + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = (error) => {
      console.log('connection error ' + webSocketUrl);
      console.log(error);
    };
    ws.current.onmessage = (message) => {
      console.log('읭?', message);
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);

      if (!dataFromServer) return;
      if (dataFromServer.command === 'messages') {
        setMessages(dataFromServer.messages);
      } else {
        setMessages((data) => [
          ...data,
          {
            message: dataFromServer.message.message,
            user_id: dataFromServer.message.user_id,
          },
        ]);
      }
    };
  };
  const fetchMessage = () => {
    ws.current.send(JSON.stringify({ command: 'fetch_messages', room_id: room.id }));
  };

  const onButtonClicked = (e) => {
    e.preventDefault();
    try {
      ws.current.send(
        JSON.stringify({
          type: 'message',
          command: 'new_message',
          message: text,
          user_id: userInfo.id,
          room_id: room.id,
        }),
      );
    } catch (e) {
      console.log(e);
    }
    setText('');
  };
  useEffect(() => {
    if (room.code) {
      connectSocket(room.code);
    }
  }, [room]);

  const userProfileImg = userInfo.social_profile;

  return (
    <div className={styles.chattingbox}>
      <div className={styles.opponentInfobox}>
        <div className={styles.Mypage_profileImgbox}>
          {userProfileImg ? <img className={styles.Mypage_profileImg} src={userInfo.social_profile} /> : <img className={styles.Mypage_profileImg} src={userimg} />}
        </div>
        <div className={styles.Chatting_Nicknamebox}>
          {room.username}[닉넴]
          <Link to="/Review_Write">
            <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
              거래완료
            </Fab>
          </Link>
        </div>

        <Chatting_drop />
      </div>
      {messages.map((msg) => {
        if (msg.user_id == userInfo.id) {
          return (
            <div className={styles.userchattingbox}>
              <div className={styles.userchatting}>{msg.text}</div>
            </div>
          );
        } else {
          return (
            <div className={styles.opponentchattingbox}>
              <div className={styles.opponentchatting}>{msg.text}</div>
            </div>
          );
        }
      })}
      <div className={styles.chat_inputbox}>
        <input className={styles.chat_input} value={text} onChange={(e) => setText(e.target.value)} placeholder="메세지를 입력하세요" type="text" />
        <div className={styles.image_uploader_wrap}>{/* <ProfileImageUploader /> */}</div>
        <button className={styles.send_button} onClick={onButtonClicked}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chatting;
