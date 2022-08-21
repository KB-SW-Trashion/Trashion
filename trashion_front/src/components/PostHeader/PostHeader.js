import React from 'react';
import styles from './PostHeader.module.css';

const PostHeader = ({ postText, leftChild, rightChild }) => {
  return (
    <header>
      <div className={styles.post_btn_left}>{leftChild}</div>
      <div className={styles.post_text}>{postText}</div>
      <div className={styles.post_btn_right}>{rightChild}</div>
    </header>
  );
};

export default PostHeader;
