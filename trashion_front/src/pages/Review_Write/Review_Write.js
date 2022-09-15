import React, { useState, useEffect } from 'react';
import styles from './Review_Write.module.css';
import logo from '../../assets/image/logo.png';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Review_Write_good } from './Review_Write_good';
import { Review_Write_bad } from './Review_Write_bad';

export default function Review_Write() {
  const [result, setresult] = useState('');

  const result_Input = (event) => {
    setresult(event.target.value);
  };

  //   function getreview(event) {
  //     document.getElementById('result').innerText = event.target.value;
  //   }

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
                <FormLabel id="demo-radio-buttons-group-label">거래는 즐거우셨나요?</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                  <FormControlLabel value="네" control={<Radio />} onClick={result_Input} label="네" sx={{ height: '30px' }} />
                  <FormControlLabel value="아니오" control={<Radio />} onClick={result_Input} label="아니오" sx={{ height: '30px' }} />
                </RadioGroup>
              </FormControl>
              <div id="result"></div>
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  mt: '3rem',
                },
              }}
            >
              <ButtonGroup variant="text" aria-label="text button group">
                <Button>닫기</Button>
                <Link to={result === '네' ? '/Review_Write_good' : '/Review_Write_bad'}>
                  <Button>평가하기</Button>
                </Link>
              </ButtonGroup>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
