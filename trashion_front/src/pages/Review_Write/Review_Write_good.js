import React, { useState, useEffect } from 'react';
import styles from './Review_Write_good.module.css';
import logo from '../../assets/image/logo.png';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function Review_Write_good() {
  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.area}>
          <div className={styles.link_wrap}>
            <Link to="/">
              <div className={styles.home}>
                <img src={logo} />
              </div>
            </Link>
            <div className={styles.Review_Write_Radiobtnbox}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">어떤 점이 좋으셨나요??</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                  <FormControlLabel value="fast" control={<Radio />} label="시간 약속을 잘 지켜요!" sx={{ height: '30px' }} />
                  <FormControlLabel value="kind" control={<Radio />} label="친절해요!" sx={{ height: '30px' }} />
                  <FormControlLabel value="fast_response" control={<Radio />} label="답장이 빨라요!" sx={{ height: '30px' }} />
                </RadioGroup>
              </FormControl>
              <div className={styles.Review_Write_TextFieldbox}>조금 더 자세히 말해주세요!</div>
              <Box component="form" noValidate autoComplete="off">
                <TextField id="outlined-basic" variant="outlined" sx={{ width: '400px', height: '100px', ml: '2rem' }} />
              </Box>
              <Fab variant="extended" type="submit" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '171px', mr: '1rem', fontWeight: 'bolder' }}>
                리뷰보내기
              </Fab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
