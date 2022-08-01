import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/3250030001553.gif';
import './Product.css';

const Product = () => {
  return (
    <li className="product">
      <Link to="/">
        <div className="thumbnail">
          <img className="productImg" src={logo} />
        </div>
      </Link>
      <div className="discription">
        <span className="price">0000원</span>
        <span className="size">Free</span>
      </div>
    </li>
  );
};

export default Product;
