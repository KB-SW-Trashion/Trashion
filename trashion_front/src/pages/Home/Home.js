import React from 'react';
import { Product, Navbar, Footer, Styles, Category } from 'components';
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [tabState, setTabState] = useState({
    tabProduct: true,
    tabStyle: false,
  });

  const tabHandler = (e) => {
    const newTabState = { ...tabState };
    const activeTab = e.currentTarget.id;
    for (let key in newTabState) {
      key === activeTab ? (newTabState[key] = true) : (newTabState[key] = false);
    }
    setTabState(newTabState);
    console.log(activeTab);
  };
  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.category}>
          <Category />
        </div>
        <div className={styles.wrap_content}>
          <div className={styles.button_wrap}>
            <div id="tabProduct" onClick={tabHandler}>
              옷버튼
            </div>
            <div id="tabStyle" onClick={tabHandler}>
              착장버튼
            </div>
          </div>

          <ul className={styles.contents}>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
            <div className="contents">
              {tabState.tabProduct ? <Product /> : ''}
              {tabState.tabStyle ? <Styles /> : ''}
            </div>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
