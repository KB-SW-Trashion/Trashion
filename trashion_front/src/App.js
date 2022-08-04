import React from 'react';
import Authorized from 'routes/Authorized';
import Unauthorized from 'routes/Unauthorized';

function App() {
  return (
    <>
      <Authorized />
      <Unauthorized />
    </>
  );
}

export default App;
