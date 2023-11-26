import { useMutation } from 'react-query';

import {
  ActivateEmailDTO,
  ForgetPasswordDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
} from '@feedstein/api-interfaces';

import baseAPI from './base-api';

export function registerUser(data: RegisterUserDTO) {
  return baseAPI.post('/auth/register', data);
}

export function useRegisterUser() {
  return useMutation<unknown, unknown, RegisterUserDTO>(registerUser);
}

export function activateEmail(data: ActivateEmailDTO) {
  return baseAPI.post('/auth/activate', data);
}

export function useActivateEmail() {
  return useMutation<unknown, unknown, ActivateEmailDTO>(activateEmail);
}

export function loginUser(data: LoginUserDTO) {
  return baseAPI.post('/auth/login', data);
}

export function useLoginUser() {
  return useMutation<unknown, unknown, LoginUserDTO>(loginUser);
}

export function forgetPassword(data: ForgetPasswordDTO) {
  return baseAPI.post('/auth/forget-password', data);
}

export function useForgetPassword() {
  return useMutation<unknown, unknown, ForgetPasswordDTO>(forgetPassword);
}

export function resetPassword(data: ResetPasswordDTO) {
  return baseAPI.post('/auth/reset-password', data);
}

export function useResetPassword() {
  return useMutation<unknown, unknown, ResetPasswordDTO>(resetPassword);
}