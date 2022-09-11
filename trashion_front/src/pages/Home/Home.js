import React, { useState } from 'react';
import { Navbar, Footer, Category, ProductList } from 'components';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faUserTie } from '@fortawesome/free-solid-svg-icons';

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
  };

  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.category}>
          <Category />
        </div>
        <div className={styles.wrap_content}>
          {/* <div className={styles.button_wrap}>
            <div className={styles.toggleIcon} id="tabProduct" onClick={tabHandler}>
              <FontAwesomeIcon icon={faShirt} size="4x" />
            </div>
            <span className={styles.line}>|</span>
            <div className={styles.toggleIcon} id="tabStyle" onClick={tabHandler}>
              <FontAwesomeIcon icon={faUserTie} size="2x" />
            </div>
          </div> */}

          <ul className={styles.contents}>
            <ProductList />
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
