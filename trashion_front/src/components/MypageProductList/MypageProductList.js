import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from 'components';

const MypageProductList = ({ user_id }) => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/item_post/item');
        const filteredProductList = response.results.filter((org) => org.user_id === user_id);
        setProductList(filteredProductList);
      } catch (err) {
        console.log('err: ', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ul>{productList && productList.map((it) => <Product key={it.id} {...it} />)}</ul>
    </>
  );
};

export default MypageProductList;
