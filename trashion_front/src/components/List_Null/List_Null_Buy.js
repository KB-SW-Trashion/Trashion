import React, { useEffect } from 'react';
import { userInfoState } from 'store';
import styles from './List_Null.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';

export default function List_Null_Buy() {
  return (
    <div>
      <h2 className={styles.List_Null_title}>구매 목록 관리</h2>
      <div className={styles.List_Null_comment}>
        <p>구매하신 상품이 없습니다.</p>
        <p>한 번 둘러 보세요!</p>
      </div>
      <div className={styles.List_Null_buttonbox}>
        <Link to="/">
          <Fab variant="extended" sx={{ width: '10rem', bgcolor: '#f8bbd0', fontWeight: 'bolder' }}>
            구경하러 가기
          </Fab>
        </Link>
      </div>
    </div>
  );
}
