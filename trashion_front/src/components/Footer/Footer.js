import React from 'react';
import styles from './Footer.module.css';

const introEx = {
  0: `Team Kookjia`,
};

export default function Footer() {
  return (
    <div className={styles.body}>
      <div>
        <p>&nbsp;</p>
        <div className={styles.footer_div_left}>Contact Us__https://github.com/KB-SW-Trashion</div>
        <div className={styles.footer_div_right}>{introEx[0]}</div>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
