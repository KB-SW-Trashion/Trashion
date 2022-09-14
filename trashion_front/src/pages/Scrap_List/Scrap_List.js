import React from 'react';
import { List_Null_Scrap, Navbar, Scrap_product } from 'components';
import user from 'api/userInfo';

export default function Scrap_List(props) {
  return (
    <div>
      <Navbar />
      <Scrap_product />
    </div>
  );
}
