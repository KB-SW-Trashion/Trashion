import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product_img } from 'components';
import styles from './Product.module.css';
import { timeForToday } from '../../utils/timeforToday';

const Product = ({ id, date, title, price, size }) => {
  const navigate = useNavigate();

  const time_gap = timeForToday(date);

  const goDetail = () => {
    navigate(`../product_detail/${id}`);
  };

  return (
    <li className={styles.product} onClick={goDetail}>
      <Product_img />
      <div className={styles.product_discription}>
        <h4>{title}</h4>
        <span className={styles.product_price}>Price: {price}</span>
        <span className={styles.update_time}>{time_gap} 작성</span>
        <span className={styles.product_size}>Size: {size}</span>
      </div>
    </li>
  );
};

export default Product;
