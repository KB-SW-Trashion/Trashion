import React from 'react';
// import TextField from '@mui/material/TextField';
import styles from './InputBox.module.css';
import { useState } from 'react';

const ID = (props) => {
  const [username, setUsername] = useState('');

  return (
    <div className={styles.int_area}>
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="off"
        required
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="username">{props.name}</label>
    </div>
  );
};

export default ID;
