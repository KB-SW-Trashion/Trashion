import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product_img } from 'components';
import { useRecoilState } from 'recoil';
import styles from './Product.module.css';
import { productState } from 'store';
import { timeForToday } from 'utils/timeforToday';

const Product = (product) => {
  useEffect(() => {
    console.log(product);
  }, []);
  const navigate = useNavigate();
  const [, setProduct] = useRecoilState(productState);

  var selected_date = new Date(product.updated_at);
  const updated_time = timeForToday(selected_date);

  // const time_gap = timeForToday(date);

  const goDetail = () => {
    setProduct(product);
    navigate(`../product_detail/${product.id}`);
  };

  return (
    <li className={styles.product} onClick={goDetail}>
      <Product_img photo={product.photos[0] && product.photos[0].photo} />
      <div className={styles.product_discription}>
        <h4>{product.title}</h4>

        <span className={styles.product_price}>Price: {product.price}</span>
        <span className={styles.product_size}>Size: {product.size}</span>
        <span className={styles.update_time}>{updated_time}</span>
      </div>
    </li>
  );
};

export default Product;
