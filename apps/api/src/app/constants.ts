import * as moment from 'moment';

export const ACTIVATION_EMAIL_TTL = moment.duration(1, 'day').asMilliseconds();

export const ACTIVATION_RESET_PASSWORD = moment.duration(30, 'minutes').asMilliseconds();
