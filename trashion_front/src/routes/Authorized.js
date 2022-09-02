import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, New, Edit } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}
