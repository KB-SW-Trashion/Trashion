import React from 'react';
import { Product } from 'components';

const MypageProductList = ({ productList }) => {
  return (
    <>
      <ul>{productList && productList.map((it) => <Product key={it.id} {...it} />)}</ul>
    </>
  );
};

export default MypageProductList;
