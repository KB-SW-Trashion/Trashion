import React, { useState, useEffect } from 'react';
import HeartImg from '../../assets/image/heart_filled.png';
import EmptyHeartImg from '../../assets/image/heart.png';
import styles from './LikeButton.module.css';
import { useRecoilValue } from 'recoil';
import { productState, authState } from 'store';
import relationship from 'api/relationship';

const LikeButton = ({ likes, setLikes }) => {
  const [isClicked, setIsClick] = useState(false);
  const product = useRecoilValue(productState);
  const user = useRecoilValue(authState);
  const item_id = product.id;
  const user_id = user.user_id;
  const data = { user: user_id, item_id: item_id };

  const checkLike = async () => {
    await relationship.isLiked(item_id).then((res) => {
      setIsClick(res.data.status);
    });
  };

  useEffect(() => {
    checkLike();
  }, []);

  const handleClick = async () => {
    await relationship.like(data).then((res) => {
      console.log('???', res.data);
      setLikes(res.data.like_count);
    });
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
