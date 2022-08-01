import React from 'react';
import { Product, Navbar } from 'components';

import './style.css';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="wrap-content">
          <ul className="contents">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </ul>
        </div>
      </div>
    </div>
  );
}
