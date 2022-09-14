import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, New, Edit, New_Profile, Chat, Findpassword, Scrap_List, Buy_List, Sell_List } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/New_Profile" element={<New_Profile />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/Findpassword" element={<Findpassword />} />
      <Route path="/Scrap_List" element={<Scrap_List />} />
      <Route path="/Buy_List" element={<Buy_List />} />
      <Route path="/Sell_List" element={<Sell_List />} />
    </Routes>
  );
}
