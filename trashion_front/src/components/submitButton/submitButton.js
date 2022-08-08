import React from 'react';
import styles from './submitButton.module.css';
// import Button from '@mui/material/Button';

const submitButton = (props) => {
  return (
    <>
      <button className={styles.submit_btn}>
        <span>{props.name}</span>
      </button>
    </>
  );
};

export default submitButton;
