import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import { ActivationPage } from './pages/acivation-page/activation-page';
import { HomePage } from './pages/home-page/home-page';
import { RegisterPage } from './pages/register-page/register-page';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <RouterRoute>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate" element={<ActivationPage />} />
      </RouterRoute>
    </BrowserRouter>
  );
};
