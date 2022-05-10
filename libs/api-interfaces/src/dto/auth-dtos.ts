import { InserUserDTO } from '../repositories/user-repository';

export type RegisterUserDTO = Pick<InserUserDTO, 'email' | 'password'>;
