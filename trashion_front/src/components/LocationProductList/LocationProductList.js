import React from 'react';
import { Product } from 'components';

const LocationProductList = ({ productList }) => {
  return (
    <>
      <ul>{productList && productList.map((it) => <Product key={it.id} {...it} />)}</ul>
    </>
  );
};

export default LocationProductList;
