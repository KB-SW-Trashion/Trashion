import React, { useState, useContext, useEffect } from 'react';
import { ProductStateContext } from '../../App';
import { ProductList, Navbar } from 'components';

const TestPage = () => {
  const productList = useContext(ProductStateContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (productList.length >= 1) {
      setData(productList);
    }
  }, [productList]);

  return (
    <div>
      <Navbar />
      <ProductList productList={data} />
    </div>
  );
};

export default TestPage;
