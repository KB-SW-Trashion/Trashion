import React from 'react';
import Authorized from 'routes/Authorized';
import Unauthorized from 'routes/Unauthorized';
import './App.css';

function App() {
  return (
    <>
      <Authorized />
      <Unauthorized />
    </>
  );
}

export default App;
