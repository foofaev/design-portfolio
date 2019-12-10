import * as _ from 'lodash';
import * as moment from 'moment';
import * as cookieSigner from 'cookie-signature';
import * as bcrypt from 'bcryptjs';
import { extension } from 'mime-types';

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

function verifyPassword(unencryptedPassword: string, encryptedPassword: string): boolean {
  return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
}

function getExtension(contentType: string | undefined, filepath: string = '') {
  const getExtensionByContentType = () => contentType && extension(contentType);
  const getExtensionByOriginalFilename = () => {
    const originalFilenameParts = _.split(filepath, '.');
    return _.size(originalFilenameParts) > 1 && _.last(originalFilenameParts);
  };
  return getExtensionByContentType() || getExtensionByOriginalFilename() || '';
}

export default {
  parseTimestamp,
  formatTimestamp,
  generateTimestamp,
  signCookie,
  unsignCookie,
  hashPassword,
  verifyPassword,
  getExtension,
};
