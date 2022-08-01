import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, Login } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
