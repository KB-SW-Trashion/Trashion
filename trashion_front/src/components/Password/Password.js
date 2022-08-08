import React from 'react';
// import TextField from '@mui/material/TextField';
import styles from '../ID/InputBox.module.css';

const Password = (props) => {
  return (
    <div className={styles.int_area}>
      <input type="password" name="password" id="password" autoComplete="off" required />
      <label htmlFor="password">{props.name}</label>
    </div>
  );
};

export default Password;
