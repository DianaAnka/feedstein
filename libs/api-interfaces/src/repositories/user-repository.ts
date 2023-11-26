import { InserUserDTO } from '../dto/auth-dtos';
import { IUserSchema } from '../entities/user-schema';

export interface IUserRepository {
  insert: (data: InserUserDTO) => Promise<IUserSchema>;
  findByEmail: (email: string) => Promise<IUserSchema | undefined>;
  activateUserByToken: (token: string) => Promise<boolean>;
  deactivateUser:(_id: string, token: string, tokenExpiresAt: Date) => Promise<IUserSchema>;
}
