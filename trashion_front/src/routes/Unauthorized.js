import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Product_detail, Register, Today_style } from 'pages';

export default function Unauthorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/today_style" element={<Today_style />} />
      <Route path="/product_detail" element={<Product_detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
