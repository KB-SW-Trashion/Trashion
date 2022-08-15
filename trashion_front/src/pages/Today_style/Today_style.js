import React from 'react';
import { Navbar, Footer, Today_product } from 'components';
import styles from './Today_style.module.css';

export default function Today_style() {
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <p className={styles.title}>Today &#39; style</p>
        <button className={styles.button}>나중에 필터</button>
        <div className={styles.wrap_content}>
          <ul className={styles.contents}>
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
