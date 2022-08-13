import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MyPage, ProfileSetting, Product_detail, Home } from 'pages';

export default function Authorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/product_detail" element={<Product_detail />} />
      <Route path="/profilesetting" element={<ProfileSetting />} />
    </Routes>
  );
}
