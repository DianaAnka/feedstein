import { InserUserDTO } from '../repositories/user-repository';

export type RegisterUserDTO = Pick<InserUserDTO, 'email' | 'password'>;

export type ActivateEmailDTO = {
  token: string;
};
