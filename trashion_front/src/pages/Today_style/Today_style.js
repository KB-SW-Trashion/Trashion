import React from 'react';
import { Navbar, Footer, Today_product } from 'components';

import './Today_style.css';

export default function Today_style() {
  return (
    <div>
      <Navbar />
      <div className="home-main">
        <p className="title">Today &#39; style</p>
        <div className="home-wrap-content">
          <ul className="home-contents">
            <Today_product />
            <Today_product />
            <Today_product />
            <Today_product />
            <Today_product />
            <Today_product />
            <Today_product />
            <Today_product />
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
}
