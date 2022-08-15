import React from 'react';
import styled from 'styled-components';
import product_img from '../../img/3250030001553.gif';

const Thumbnail = styled.div`
  width: 100px;
  height: 110px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 69.5px;
  height: 110px;
`;

const Img = styled.img`
  width: 69.5px;
  height: 110px;
`;

const Product_img = () => {
  return (
    <Thumbnail>
      <ImgBox>
        <Img src={product_img} />
      </ImgBox>
    </Thumbnail>
  );
};

export default Product_img;
