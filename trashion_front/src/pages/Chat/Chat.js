import React from 'react';
import { Navbar, Chatlog, Chatting } from 'components';
import styles from './Chat.module.css';
import { Link } from 'react-router-dom';

export default function Chat() {
  return (
    <div>
      <Navbar />
      <div className={styles.chatbox}>
        <div className={styles.chatinnerbox}>
          <div className={styles.chatleftbox}>
            <div className={styles.chatlist}>
              <Link to="/">
                <Chatlog />
              </Link>
            </div>
          </div>
          <div className={styles.chatrightbox}>
            <Chatting />
          </div>
        </div>
      </div>
    </div>
  );
}
