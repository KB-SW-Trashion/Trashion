import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Category, ProductList, LocationCategory, PostButton, LocationChip } from 'components';
import styles from './Home.module.css';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { locationState } from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [locationList, setLocationList] = useState([]);
  const cityInfo = useRecoilValue(locationState);
  const resetCityInfo = useResetRecoilState(locationState);
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
  // };

  useEffect(() => {
    setLocationList([]);
    resetCityInfo();
  }, []);

  const addLocation = () => {
    if (locationList.length < 5) {
      setLocationList([...locationList, cityInfo]);
    } else {
      alert('지역은 최대 5개만 설정 가능합니다!');
    }

    console.log('locationList: ', locationList);
    console.log('cityInfo: ', cityInfo);
  };

  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.category}>
          <Category />
        </div>
        <div className={styles.wrap_content}>
          <div className={styles.locationWrap}>
            <LocationCategory />
            <div className={styles.buttonWrap}>
              <PostButton text={'추가하기'} onClick={addLocation} />
            </div>
            <LocationChip locationList={locationList} />
          </div>
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
