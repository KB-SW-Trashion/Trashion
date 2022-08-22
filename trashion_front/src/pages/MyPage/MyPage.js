import React from 'react';
import { Navbar, Footer, Product } from 'components';
import img_example from '../../img/img_example.jpg';
import styles from './MyPage.module.css';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div>
      <Navbar />

      <div className={styles.MyPage_bodybox}>
        <div className={styles.MyPage_bodyleft}>
          <div className={styles.Mypage_profileImgbox}>
            <img className={styles.Mypage_profileImg} src={img_example} />
          </div>
        </div>
        <div className={styles.MyPage_bodyright}>
          <div className={styles.Mypage_profilecontentsbox}>
            <h2>[User_ID] </h2>
            <h3> [자기소개] </h3>
            <div className={styles.Mypage_profilecontentsboxinner}>
              <div className={styles.Mypage_profilecontentsboxinnerright}>
                <p> 팔로워:[follower_amount]</p>
                <p> 키:[seller_height]</p>
                <p> 상의사이즈:[seller_size_top]</p>
                <p> 거래완료수:[total_trade]</p>
              </div>
              <div>
                <p> 팔로잉:[following_amount]</p>
                <p> 몸무게:[seller_weight]</p>
                <p> 하의사이즈:[seller_size_bottom]</p>
                <p> 누적 좋아요 수:[total_like]</p>
              </div>
            </div>
          </div>
          <div className={styles.Mypage_buttonbox}>
            <Link to="/">
              <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
                비밀번호 수정
              </Fab>
            </Link>
            <Link to="/">
              <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', fontWeight: 'bolder' }}>
                내 정보 수정
              </Fab>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.MyPage_list}>
        <p className={styles.MyPage_list_title}>내가 쓴 글</p>
        <hr className={styles.Mypage_hr} />
        <div>
          <Product></Product>
        </div>
      </div>

      <div className={styles.MyPage_footerbox}>
        <Footer />
      </div>
    </div>
  );
}
