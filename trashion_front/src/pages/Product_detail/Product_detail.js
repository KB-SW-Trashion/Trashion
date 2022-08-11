import React from 'react';
// import { useState } from 'react';
import { Navbar, Product_img } from 'components';
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
        <h1 className={styles.product_title}>내애애앵장고 배애애애애지</h1>
        <div className={styles.detail_box}>
          <Product_img />

          <div className={styles.discription_box}>
            <div className={styles.product_condition}>
              <h1>제품상태</h1>
              <span>사이즈: XL</span>
              <span>착용 횟수 : 3번</span>
              <span>상태 : S</span>
              <span>구매시기 : 2021/12</span>
            </div>
            <div className={styles.seller_size}>
              <h1>판매자 사이즈</h1>
              <span>키 : 215cm</span>
              <span>몸무게 : 110kg</span>
              <span>상의 : XL</span>
              <span>하의 : XL</span>
            </div>
          </div>
        </div>

        <div className={styles.contents_wrap}>
          <div className={styles.img_wrap}>
            <Product_img />
          </div>
          <p>
            내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.내애애애애앵재애애애앵고
            바아앙아ㅏ지입니다.내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고
            바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고
            바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다. 내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.
          </p>
          <div className={styles.img_wrap}>
            <Product_img />
          </div>
          <p>내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.</p>
          <div className={styles.img_wrap}>
            <Product_img />
          </div>
          <p>내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.</p>
          <div className={styles.img_wrap}>
            <Product_img />
          </div>
          <p>내애애애애앵재애애애앵고 바아앙아ㅏ지입니다.</p>
        </div>
      </div>
    </>
  );
};

export default Product_detail;
