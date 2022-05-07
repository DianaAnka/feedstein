import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import { Home } from './pages/home/home-page';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <RouterRoute>
        <Route path="/" element={<Home />} />
      </RouterRoute>
    </BrowserRouter>
  );
};
