import React from 'react';
// import { useState } from 'react';
import { Navbar, Product_img, Img_small } from 'components';
import styles from './Product_detail.module.css';

const Product_detail = () => {
  // const [tabState, setTabState] = useState({
  //   tabProduct: true,
  //   tabStyle: false,
  // });

  // const tabHandler = (e) => {
  //   const newTabState = { ...tabState };
  //   const activeTab = e.currentTarget.id;
  //   for (let key in newTabState) {
  //     key === activeTab ? (newTabState[key] = true) : (newTabState[key] = false);
  //   }
  //   setTabState(newTabState);
  //   console.log(activeTab);
  // };

  return (
    <>
      <Navbar />
      <div className={styles.detail_wrap}>
        <div className={styles.user_profile}>profile</div>
        <div className={styles.detail_box}>
          <div className={styles.product_img_box}>
            <div className={styles.img_big}>
              <Product_img />
            </div>
            <div className={styles.img_small_wrap}>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
              <div className={styles.img_small}>
                <Img_small />
              </div>
            </div>
          </div>

          <div className={styles.discription_box}>
            <div className={styles.product_info}>
              <p className={styles.info}>물품 정보</p>
              <h2>[Product_name]</h2>
              <h3>[Product_price]</h3>
              <p>착용 기간 : 1 year</p>
              <p>사이즈 : 105</p>
              <p>상태 : 아주 굳</p>
            </div>
            <div className={styles.seller_info}>
              <p className={styles.info}>판매자 정보</p>
              <h2>키 : 204cm</h2>
              <h3>몸무게 : 20kg</h3>
              <p>사이즈 : 1020</p>
            </div>
          </div>
        </div>

        <hr />

        <div className={styles.contents_wrap}>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>
                얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라 얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라
              </p>
            </div>
          </div>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>
                얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라 얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라
              </p>
            </div>
          </div>
          <div className={styles.img_wrap}>
            <Product_img />
            <div className={styles.text_wrap}>
              <p>
                얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라 얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리
                얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리
                얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성 얄라리 얄라얄리얄리 얄라성
                얄라리 얄라얄리얄리 얄라성 얄라리 얄라
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_detail;
