import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from 'components';
import styles from './ProductList.module.css';

const ProductList = () => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/item_post/item');
        setProductList(response.results);
        console.log(response);
      } catch (err) {
        console.log('err: ', err);
      }
    };

    fetchData();
  }, []);

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
