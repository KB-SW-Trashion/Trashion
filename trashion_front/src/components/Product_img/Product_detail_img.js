import React from 'react';
import styles from './Product_img.module.css';

const Product_detail_img = (selectImg) => {
  console.log(selectImg);
  return (
    <div className={styles.thumbnail}>
      <img className={styles.product_img} src={selectImg.selectImg} />
    </div>
  );
};

export default Product_detail_img;
