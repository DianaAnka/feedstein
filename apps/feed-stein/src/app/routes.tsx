import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoute } from 'react-router-dom';
import { ActivationPage } from './pages/acivation-page/activation-page';
import { HomePage } from './pages/home-page/home-page';
import { RegisterPage } from './pages/register-page/register-page';
import { LoginPage } from './pages/login-page/login-page';
import { ForgetPasswordPage } from './pages/forget-password-page/forget-password-page';
import { ResetPasswordPage } from './pages/reset-password-page copy/reset-password-page';

export interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <RouterRoute>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate" element={<ActivationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </RouterRoute>
    </BrowserRouter>
  );
};
