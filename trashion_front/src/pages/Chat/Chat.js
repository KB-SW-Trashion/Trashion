import React, { useState, useEffect } from 'react';
import { Navbar, Chatlog, Chatting } from 'components';
import styles from './Chat.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function Chat() {
  const location = useLocation();
  const [room, setRoom] = useState({
    id: '',
    username: '',
    user_id: '',
    code: '',
  });
  console.log('room', room);
  useEffect(() => {
    console.log('??', location.state);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.chatbox}>
        <div className={styles.chatinnerbox}>
          <div className={styles.chatleftbox}>
            <Chatlog chatList={location.state} setRoom={setRoom} />
          </div>
          <div className={styles.chatrightbox}>
            <Chatting room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}
