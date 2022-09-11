import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Product_detail, Register } from 'pages';

export default function Unauthorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product_detail/:id" element={<Product_detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
