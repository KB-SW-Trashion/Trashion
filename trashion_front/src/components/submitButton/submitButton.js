import React from 'react';
import './style.css';
// import Button from '@mui/material/Button';

const submitButton = (props) => {
  return (
    <>
      <button className="submit-btn">
        <span>{props.name}</span>
      </button>
    </>
  );
};

export default submitButton;
