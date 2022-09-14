import React, { useEffect } from 'react';
import styles from './Scrap_Product.module.css';
import userimg from 'assets/image/userimg.png';
import authApi from 'api/authApi';
import user from 'api/userInfo';
import { useNavigate } from 'react-router-dom';
import { productState } from 'store';
import { useRecoilState } from 'recoil';
import { Scrap_product_img } from 'components';

export default function Scrap_product(product) {
  useEffect(() => {}, []);

  const profile_img = userimg;
  const navigate = useNavigate();
  const [, setProduct] = useRecoilState(productState);

  const goDetail = () => {
    setProduct(product);
    navigate(`../product_detail/${product.id}`);
  };

  return (
    <div className={styles.Scrap_productbox}>
      <div>
        <Scrap_product_img className={styles.Scrap_product_img} />
      </div>
      <div className={styles.Scrap_product_infobox}>
        <div className={styles.Scrap_product_title}>{product.title}</div>
        <div className={styles.Scrap_product_location}>{product.price}</div>
        <div className={styles.Scrap_product_buttonbox}>
          <div className={styles.Scrap_product_price}>{product.price}</div>
          <div>
            <button className={styles.Scrap_product_buybutton} onClick={goDetail}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}