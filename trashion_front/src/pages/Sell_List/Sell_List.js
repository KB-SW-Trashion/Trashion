import React from 'react';
import { List_Null_Sell, Navbar } from 'components';
import user from 'api/userInfo';

export default function Sell_List(props) {
  return (
    <div>
      <Navbar />
      <List_Null_Sell />
    </div>
  );
}
