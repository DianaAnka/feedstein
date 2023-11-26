import { IUserSchema } from '@feedstein/api-interfaces';
import logger from '../infra/logger';
import EmailService from '../services/email-service';
import Events, { Event, EventType } from './pub-sub';

export class RegisterUserEvent extends Event<IUserSchema> {
  constructor(user: IUserSchema) {
    super(EventType.REGISTER, user);
  }
}

export class forgetPasswordEvent extends Event<IUserSchema> {
  constructor(user: IUserSchema) {
    super(EventType.FORGETPASSWORD, user);
  }
}

async function handleSendActivationEmail(event: RegisterUserEvent) {
  try {
    await EmailService.sendActivationEmail(event.payload);
  } catch (e) {
    logger.error(e);
  }
}

async function handleForgetPasswordEmail(event: forgetPasswordEvent) {
  try {
    await EmailService.sendResetPasswordEmail(event.payload);
  } catch (e) {
    logger.error(e);
  }
}

Events.on(EventType.REGISTER, handleSendActivationEmail);

Events.on(EventType.FORGETPASSWORD, handleForgetPasswordEmail);
