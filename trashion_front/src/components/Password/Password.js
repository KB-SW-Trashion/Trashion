import React from 'react';
// import TextField from '@mui/material/TextField';
import styles from '../ID/InputBox.module.css';
import { useState } from 'react';

const Password = (props) => {
  const [password, setPassword] = useState('');

  return (
    <div className={styles.int_area}>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="off"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="password">{props.name}</label>
    </div>
  );
};

export default Password;
