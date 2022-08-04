import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Today_style } from 'pages';

export default function Unauthorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/today_style" element={<Today_style />} />
    </Routes>
  );
}
