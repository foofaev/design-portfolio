import _ from 'lodash';
import moment from 'moment';
import cookieSigner from 'cookie-signature';
import bcrypt from 'bcryptjs';
import { extension } from 'mime-types';

const timestampFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

function parseTimestamp(timestamp: string): moment.Moment {
  return moment.utc(timestamp, timestampFormat);
}

function formatTimestamp(date: string | moment.Moment | Date): string {
  return moment.utc(date).format(timestampFormat);
}

function generateTimestamp(): string {
  return moment.utc().format(timestampFormat);
}

function signCookie(uuid: string, secret: string): string {
  return cookieSigner.sign(uuid, secret);
}

function unsignCookie(uuid: string, secret: string): string | false {
  return cookieSigner.unsign(uuid, secret);
}

function hashPassword(value: string): string {
  return bcrypt.hashSync(value, 10);
}

function verifyPassword(decryptedPassword: string, encryptedPassword: string): boolean {
  return bcrypt.compareSync(decryptedPassword, encryptedPassword);
}

function getExtension(contentType: string | undefined, filepath = ''): string {
  const getExtensionByContentType = (): string | false | undefined => contentType && extension(contentType);
  const getExtensionByOriginalFilename = (): string | false | undefined => {
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
