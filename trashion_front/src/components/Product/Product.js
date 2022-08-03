import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/3250030001553.gif';
import './Product.css';

const Product = () => {
  return (
    <li className="product">
      <Link to="/">
        <div className="thumbnail">
          <img className="product-img" src={logo} />
        </div>
      </Link>
      <div className="product-discription">
        <span className="product-price">0000원</span>
        <span className="product-size">Free</span>
      </div>
    </li>
  );
};

export default Product;
