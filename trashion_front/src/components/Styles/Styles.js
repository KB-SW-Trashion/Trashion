import React from 'react';
import { Link } from 'react-router-dom';
import { Styles_img } from 'components';
import styles from './Styles.module.css';

const Styles = () => {
  return (
    <li className={styles.product}>
      <Link to="/product_detail">
        <Styles_img />
      </Link>
      <div className={styles.product_discription}>
        <span className={styles.product_price}>0000원</span>
        <span className={styles.product_size}>Free</span>
      </div>
    </li>
  );
};

export default Styles;
