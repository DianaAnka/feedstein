import { IUserSchema } from '../entities/user-schema';

export type InserUserDTO = Omit<IUserSchema, '_id'>;

export type RegisterUserDTO = InserUserDTO;

export interface IUserRepository {
  insert: (data: InserUserDTO) => Promise<IUserSchema>;
  findByEmail: (email: string) => Promise<IUserSchema | undefined>;
}
