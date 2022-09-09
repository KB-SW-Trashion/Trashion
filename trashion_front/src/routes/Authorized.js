import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, New, Edit, New_Profile, Chat, Findpassword } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/New_Profile" element={<New_Profile />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/Findpassword" element={<Findpassword />} />
    </Routes>
  );
}
