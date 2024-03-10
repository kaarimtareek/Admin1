import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Container from '@mui/material/Container';

import BlogHome from '../CRUD/BlogHome';
import BlogCreate from '../CRUD/BlogCreate';
import BlogUpdate from '../CRUD/BlogUpdate';
// ----------------------------------------------------------------------

export default function BlogView() {
  return (
    <Container>
    <Routes>
      <Route path="/" element={<BlogHome />} />
      <Route path="/Usercreate" element={<BlogCreate />} />
      <Route path="/UserUpdate" element={<BlogUpdate />} />

      {/* Add more routes as needed */}
    </Routes>
    </Container>
  );
}


