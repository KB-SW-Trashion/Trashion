import React from 'react';
import styles from './Product_img.module.css';

const Product_img = (photo) => {
  return (
    <div className={styles.thumbnail}>
      <img className={styles.product_img} src={photo.photo} />
    </div>
  );
};

export default Product_img;
