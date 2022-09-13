import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Category, ProductList, LocationCategory, PostButton } from 'components';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import hangjungdong from 'utils/hangjungdong';
import locationApi from 'api/locationApi';
import styles from './Home.module.css';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { locationState } from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faUserTie } from '@fortawesome/free-solid-svg-icons';
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Home() {
  const [chipIndex, setChipIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);
  const [locationList, setLocationList] = useState([]);
  const cityInfo = useRecoilValue(locationState);
  const resetCityInfo = useResetRecoilState(locationState);
  const { sido, sigugun, dong } = hangjungdong;
  const [chipData, setChipData] = useState([]);
  // const [isResetLocationCategory, setIsResetLocationCategory] = useState(false);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    setLocationList((locations) => locations.filter((location) => location.key !== chipToDelete.key));
  };

  useEffect(() => {
    setChipData([]);
    setChipIndex(0);
    setLocationIndex(0);
    setLocationList([]);
    resetCityInfo();
  }, []);

  const addLocation = () => {
    let city =
      sido.filter((el) => el.sido === cityInfo.city)[0]?.codeNm +
      ' ' +
      sigugun.filter((el) => el.sido === cityInfo.city && el.sigugun === cityInfo.gu)[0]?.codeNm +
      ' ' +
      dong.filter((el) => el.sido === cityInfo.city && el.sigugun === cityInfo.gu && el.dong === cityInfo.dong)[0]?.codeNm;
    if (!cityInfo.city || !cityInfo.gu || !cityInfo.dong) {
      alert('지역을 선택 해 주세요!');
      return;
    }
    if (locationList.length < 5) {
      setLocationList([...locationList, { key: locationIndex, cityInfo }]);
      setChipData([...chipData, { key: chipIndex, label: city }]);
      setChipIndex(() => chipIndex + 1);
      setLocationIndex(() => locationIndex + 1);
    } else {
      alert('지역은 최대 5개만 설정 가능합니다!');
      return;
    }
    // setIsResetLocationCategory(true);
    // console.log(isResetLocationCategory);
  };

  const setLocation = () => {
    for (let i = 0; i < locationList.length; i++) {
      locationApi.getfilteredItem(locationList[i].cityInfo.city, locationList[i].cityInfo.gu, locationList[i].cityInfo.dong).then((res) => {
        console.log(res);
      });
    }
    console.log(locationList);
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
              <div>
                <PostButton text={'추가하기'} onClick={addLocation} />
              </div>
              <div className={styles.applyLocationButton}>
                <PostButton text={'적용하기'} type={'positive'} onClick={setLocation} />
              </div>
            </div>
          </div>
          <div className={styles.locationChipWrap}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                ml: 14,
                width: 1300,
              }}
              component="ul"
            >
              {chipData.map((data) => {
                let icon;

                if (data.label === 'React') {
                  icon = <TagFacesIcon />;
                }

                return (
                  <ListItem key={data.key}>
                    <Chip icon={icon} label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                );
              })}
            </Paper>
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
