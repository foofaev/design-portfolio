import * as moment from 'moment';
import * as cookieSigner from 'cookie-signature';
import * as bcrypt from 'bcryptjs';

const timestampFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

function parseTimestamp(timestamp: string): moment.Moment {
  return moment.utc(timestamp, timestampFormat);
}

function formatTimestamp(date: string | moment.Moment | Date): string {
  return moment.utc(date).format(timestampFormat);
}

function generateTimestamp() {
  return moment.utc().format(timestampFormat);
}

function signCookie(uuid: string, secret: string) {
  return cookieSigner.sign(uuid, secret);
}

function unsignCookie(uuid: string, secret: string) {
  return cookieSigner.unsign(uuid, secret);
}

function hashPassword(value:string) {
  return bcrypt.hashSync(value, 10);
}

function verifyPassword(unencryptedPassword: string, encryptedPassword: string) {
  return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
}

export default {
  parseTimestamp,
  formatTimestamp,
  generateTimestamp,
  signCookie,
  unsignCookie,
  hashPassword,
  verifyPassword,
};
