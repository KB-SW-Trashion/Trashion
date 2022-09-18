import React from 'react';
import { Product } from 'components';
import styles from './ProductList.module.css';

const ProductList = ({ productList }) => {
  return (
    <>
      <ul className={styles.contents}>{productList && productList.map((it) => <Product key={it.id} {...it} />)}</ul>
    </>
  );
};

ProductList.defaultProps = {
  productList: [],
};

export default ProductList;
