import { IUserSchema } from '../entities/user-schema';

export type InserUserDTO = Omit<IUserSchema, '_id'>;

export type RegisterUserDTO = Pick<InserUserDTO, 'email' | 'password'>;

export type ActivateEmailDTO = {
  token: string;
};

export type LoginUserDTO = Pick<InserUserDTO, 'email' | 'password'>;

export type ForgetPasswordDTO = {
  email: string;
};

export type ResetPasswordDTO = {
  password: string;
  token: string;
};

export type LoginResponseDTO = {
  user: IUserSchema;
  token: string;
};
