import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, ProfileSetting } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/profilesetting" element={<ProfileSetting />} />
    </Routes>
  );
}
