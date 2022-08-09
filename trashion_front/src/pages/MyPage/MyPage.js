import React from 'react';
import { Navbar, Footer } from 'components';
import img_example from '../../img/img_example.jpg';
import styles from './MyPage.module.css';

export default function MyPage() {
  return (
    <div>
      <Navbar />

      <div className={styles.MyPage_bodybox}>
        <div className={styles.MyPage_bodyleft}>
          <img className={styles.productImg} src={img_example} width="300px" height="300px" />
        </div>
        <div className={styles.MyPage_bodyright}>
          <p>이름:나는지윤이다 이거는 예시</p>
          <p>사이즈:나는 이거이거이거이거다</p>
        </div>
      </div>
      <div className={styles.MyPage_list}>
        <p className={styles.MyPage_list_title}>내가 쓴 글</p>
        <div></div>
      </div>

      <div className={styles.MyPage_footerbox}>
        <Footer />
      </div>
    </div>
  );
}
