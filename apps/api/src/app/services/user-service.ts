import {
  InserUserDTO,
  IUserSchema,
  RegisterUserDTO,
} from '@feedstein/api-interfaces';
import { getRandomString, hashString } from '@feedstein/utils';
import UserRepository from '../repositories/user-repository';
import * as moment from 'moment';
import Events, { EventType } from '../events/pub-sub';
import { RegisterUserEvent } from '../events/auth-events';

export class UserService {
  async isEmailAlreadyUsed(email: string): Promise<boolean> {
    const user = await UserRepository.findByEmail(email);
    return Boolean(user);
  }

  async registerUser(data: RegisterUserDTO): Promise<IUserSchema> {
    const activationToken = getRandomString();

    const activationTokenExpirseAt = moment().add(1, 'day').toDate();

    const userDTO: InserUserDTO = {
      email: data.email,
      password: await hashString(data.password),
      active: false,
      activationToken,
      activationTokenExpirseAt,
    };
    const user = await UserRepository.insert(userDTO);

    Events.emit(EventType.REGISTER, new RegisterUserEvent(user));

    delete user.password;
    delete user.activationToken;
    delete user.activationTokenExpirseAt;
    return user;
  }
}

export default new UserService();
