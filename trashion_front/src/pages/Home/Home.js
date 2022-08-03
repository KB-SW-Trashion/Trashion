import React from 'react';
import { Product, Navbar, Footer } from 'components';

import './style.css';

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="homeMain">
        <div className="home-wrap-content">
          <ul className="home-contents">
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
      <Footer />
    </div>
  );
}
