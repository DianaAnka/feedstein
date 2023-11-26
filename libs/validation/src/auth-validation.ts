import * as Yup from 'yup';

export const registerUserSchema = Yup.object({
  email: Yup.string().email(),
  password: Yup.string().min(6).max(30),
}).required();

export const activateEmailSchema = Yup.object({
  token: Yup.string().required(),
}).required();

export const loginUserSchema = Yup.object({
  email: Yup.string().email(),
  password: Yup.string(),
}).required();

export const forgetPasswordSchema = Yup.object({
  email: Yup.string().required(),
}).required();

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).max(30),
}).required();
