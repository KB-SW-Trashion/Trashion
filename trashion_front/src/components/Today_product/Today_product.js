import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/3250030001553.gif';
import styles from './Today_product.module.css';

export default function Today_product() {
  return (
    <li className={styles.product}>
      <Link to="/">
        <div className={styles.thumbnail}>
          <img className={styles.productImg} src={logo} />
        </div>
        <div className={styles.discription}>
          <span className={styles.styletitle}>S급셔츠</span>
        </div>
      </Link>
    </li>
  );
}
