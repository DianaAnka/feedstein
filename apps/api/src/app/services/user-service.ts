import {
  ActivateEmailDTO,
  InserUserDTO,
  IUserSchema,
  LoginUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
} from '@feedstein/api-interfaces';
import {
  compareHashingStrings,
  getRandomString,
  hashString,
} from '@feedstein/utils';
import UserRepository from '../repositories/user-repository';
import * as moment from 'moment';
import Events, { EventType } from '../events/pub-sub';
import { forgetPasswordEvent, RegisterUserEvent } from '../events/auth-events';
import { ACTIVATION_EMAIL_TTL, ACTIVATION_RESET_PASSWORD } from '../constants';

export class UserService {
  async isEmailAlreadyUsed(email: string): Promise<boolean> {
    const user = await UserRepository.findByEmail(email);
    return Boolean(user);
  }

  async registerUser(data: RegisterUserDTO): Promise<IUserSchema> {
    const activationToken = getRandomString();

    const activationTokenExpirseAt = moment()
      .add(ACTIVATION_EMAIL_TTL)
      .toDate();

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

  activateEmail(data: ActivateEmailDTO): Promise<boolean> {
    return UserRepository.activateUserByToken(data.token);
  }

  isAccounActivated(user: IUserSchema): boolean {
    return user.active;
  }

  async getUser(data: LoginUserDTO): Promise<IUserSchema> {
    const user = await UserRepository.findByEmail(data.email);
    if (user && (await compareHashingStrings(data.password, user.password)))
      return user;
  }

  async getUserByEmail(email: string): Promise<IUserSchema> {
    const user = await UserRepository.findByEmail(email);
    return user;
  }

  async deactivateUser(userId) {
    const activationToken = getRandomString();
    const activationTokenExpirseAt = moment()
      .add(ACTIVATION_RESET_PASSWORD)
      .toDate();
    return await UserRepository.deactivateUser(
      userId,
      activationToken,
      activationTokenExpirseAt
    );
  }

  async forgetPassword(user: IUserSchema) {
    const result = await this.deactivateUser(user._id);
    if (result) {
      Events.emit(EventType.FORGETPASSWORD, new forgetPasswordEvent(result));
    } else throw new Error('error while deactivation');
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const password = await hashString(resetPasswordDTO.password);
    return UserRepository.resetPassword(resetPasswordDTO.token, password);
  }
}

export default new UserService();
