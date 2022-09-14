import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from 'components';
import styles from './ProductList.module.css';

const ProductList = ({ filteredByLocation }) => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    if (filteredByLocation.length < 1) {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get('/item_post/item');
          setProductList(response.results);
        } catch (err) {
          console.log('err: ', err);
        }
      };
      fetchData();
    } else {
      setProductList(filteredByLocation);
    }
    console.log('productList: ', productList);
    console.log('filtered items: ', filteredByLocation);
  }, [filteredByLocation]);

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
