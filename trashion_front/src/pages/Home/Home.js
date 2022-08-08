import React from 'react';
import { Product, Navbar, Footer } from 'components';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.wrap_content}>
          <ul className={styles.contents}>
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
