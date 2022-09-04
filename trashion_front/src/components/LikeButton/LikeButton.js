import React, { useState } from 'react';
import HeartImg from '../../assets/image/heart_filled.png';
import EmptyHeartImg from '../../assets/image/heart.png';
import styles from './LikeButton.module.css';
import { useRecoilValue } from 'recoil';
import { productState, authState } from 'store';
import relationship from 'api/relationship';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClick] = useState(false);
  const product = useRecoilValue(productState);
  const user = useRecoilValue(authState);
  const item_id = product.id;
  const user_id = user.user_id;
  const data = { user: user_id, item_id: item_id };

  const handleClick = () => {
    if (isClicked) {
      relationship.like(data).then((res) => console.log(res));
      setLikes(likes - 1);
    } else {
      relationship.like(data).then((res) => console.log(res));
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
