import React, { useEffect, useState } from 'react';
import item from 'api/itemApi';
import { Product } from 'components';

const MypageProductList = ({ user_id }) => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    item.getMyItem(user_id).then((res) => {
      setProductList(res.data.results);
    });
  }, []);

  return (
    <>
      <ul>{productList && productList.map((it) => <Product key={it.id} {...it} />)}</ul>
    </>
  );
};

export default MypageProductList;
