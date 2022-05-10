import { IUserSchema } from '@feedstein/api-interfaces';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as ejs from 'ejs';
import {
  FRONTEND_URL,
  SMTP_FROM,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from '../config';

const ACTIVATION_EMAIL_TEMPLATE_PATH = path.join(
  __dirname,
  'assets',
  'templates',
  'html',
  'activation.html'
);

class CEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationEmail(user: IUserSchema) {
    const activationLink = `${FRONTEND_URL}/auth/activate?token=${user.activationToken}`;
    const html = await ejs.renderFile(ACTIVATION_EMAIL_TEMPLATE_PATH, {
      name: user.email,
      activationLink,
    });
    await this.transporter.sendMail({
      subject: 'Activate your feedstein account',
      from: SMTP_FROM,
      to: user.email,
      html,
    });
  }
}

const EmailService = new CEmailService();
export default EmailService;
