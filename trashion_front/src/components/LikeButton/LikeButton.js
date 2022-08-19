import React, { useState } from 'react';
import HeartImg from '../../assets/image/heart_filled.png';
import EmptyHeartImg from '../../assets/image/heart.png';
import styles from './LikeButton.module.css';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClick] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClick(!isClicked);
  };

  return (
    <div className={styles.heart_btn} onClick={handleClick}>
      <div className={styles.img_wrap}>
        <img className={styles.heart_img} src={isClicked ? HeartImg : EmptyHeartImg} />
      </div>
      <div className={styles.like_wrap}>
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default LikeButton;
