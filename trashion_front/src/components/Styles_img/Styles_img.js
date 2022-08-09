import React from 'react';
import style_img from '../../img/img_example.jpg';
import styles from './Styles_img.module.css';

const Product_img = () => {
  return (
    <div className={styles.thumbnail}>
      <img className={styles.img} src={style_img} />
    </div>
  );
};

export default Product_img;
