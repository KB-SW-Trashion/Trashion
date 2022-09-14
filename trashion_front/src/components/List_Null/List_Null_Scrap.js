import React, { useEffect } from 'react';
import { userInfoState } from 'store';
import styles from './List_Null.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';

export default function List_Null_Scrap() {
  return (
    <div>
      <h2 className={styles.List_Null_title}>찜 목록 관리</h2>
      <div className={styles.List_Null_comment}>
        <p>찜 목록에 상품이 없습니다.</p>
        <p>관심상품을 등록해보세요!</p>
      </div>
      <div className={styles.List_Null_buttonbox}>
        <Link to="/">
          <Fab variant="extended" sx={{ width: '10rem', bgcolor: '#f8bbd0', fontWeight: 'bolder' }}>
            홈으로
          </Fab>
        </Link>
      </div>
    </div>
  );
}
