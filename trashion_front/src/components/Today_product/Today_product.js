import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/3250030001553.gif';
import './Today_product.css';

export default function Today_product() {
  return (
    <li className="product">
      <Link to="/">
        <div className="thumbnail">
          <img className="productImg" src={logo} />
        </div>
      </Link>
    </li>
  );
}
