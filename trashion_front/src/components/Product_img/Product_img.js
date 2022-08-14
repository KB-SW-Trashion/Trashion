import React from 'react';
import product_img from '../../img/3250030001553.gif';
import styles from './Product_img.module.css';

const Product_img = () => {
  return (
    <div className={styles.thumbnail}>
      <img className={styles.product_img} src={product_img} />
    </div>
  );
};

export default Product_img;
