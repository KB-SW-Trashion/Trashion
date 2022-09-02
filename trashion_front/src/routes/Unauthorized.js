import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Product_detail, Register, Today_style, New_Profile } from 'pages';

export default function Unauthorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/today_style" element={<Today_style />} />
      <Route path="/product_detail/:id" element={<Product_detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/New_Profile" element={<New_Profile />} />
    </Routes>
  );
}
