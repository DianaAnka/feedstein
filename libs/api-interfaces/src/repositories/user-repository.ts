import { IUserSchema } from '../entities/user-schema';

export type InserUserDTO = Omit<IUserSchema, '_id'>;

export interface IUserRepository {
  insert: (data: InserUserDTO) => Promise<IUserSchema>;
  findByEmail: (email: string) => Promise<IUserSchema | undefined>;
  activateUserByToken: (token: string) => Promise<boolean>;
  deactivateUser:(_id: string, token: string, tokenExpiresAt: Date) => Promise<IUserSchema>;
}
