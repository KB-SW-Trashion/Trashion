import React from 'react';
import { List_Null_Buy, Navbar } from 'components';
import user from 'api/userInfo';

export default function Buy_List(props) {
  return (
    <div>
      <Navbar />
      <List_Null_Buy />
    </div>
  );
}
