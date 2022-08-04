import React from 'react';
// import TextField from '@mui/material/TextField';
import '../ID/InputBox.css';

const Password = (props) => {
  return (
    <div className="int-area">
      <input type="password" name="password" id="password" autoComplete="off" required />
      <label htmlFor="password">{props.name}</label>
    </div>
  );
};

export default Password;
