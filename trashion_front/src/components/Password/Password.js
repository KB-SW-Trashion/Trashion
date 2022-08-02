import React from 'react';
// import TextField from '@mui/material/TextField';
import '../ID/InputBox.css';

const ID = () => {
  return (
    <div className="int-area">
      <input type="password" name="password" id="password" autoComplete="off" required />
      <label htmlFor="pw">PASSWORD</label>
    </div>
  );
};

export default ID;
