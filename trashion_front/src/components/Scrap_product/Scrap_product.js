import React, { useState, useEffect } from 'react';
import styles from './Scrap_Product.module.css';
import { useNavigate } from 'react-router-dom';
import { productState, authState } from 'store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Scrap_product_img } from 'components';

export default function Scrap_product(product) {
  const navigate = useNavigate();
  const [, setProduct] = useRecoilState(productState);
  const photo = product.photos[0].photo;

  const goDetail = () => {
    setProduct(product);
    navigate(`../product_detail/${product.id}`);
  };

  return (
    <div className={styles.Scrap_productbox}>
      <div>
        <Scrap_product_img photo={photo} className={styles.Scrap_product_img} />
      </div>
      <div className={styles.Scrap_product_infobox}>
        <div className={styles.Scrap_product_title}>{product.title}</div>
        <div className={styles.Scrap_product_location}>{product.price}</div>
        <div className={styles.Scrap_product_buttonbox}>
          <div className={styles.Scrap_product_price}>{product.price} 원</div>
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
