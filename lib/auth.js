import crypto from 'crypto';

const ALGORITHM = 'pbkdf2_sha512';
const ITERATIONS = 120000;
const KEY_LENGTH = 64;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(String(password), salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');
  return `${ALGORITHM}$${ITERATIONS}$${salt}$${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  const [algorithm, iterationsValue, salt, derivedKey] = String(storedHash || '').split('$');

  if (algorithm !== ALGORITHM || !iterationsValue || !salt || !derivedKey) {
    return false;
  }

  const nextDerivedKey = crypto.pbkdf2Sync(String(password), salt, Number(iterationsValue), derivedKey.length / 2, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(derivedKey, 'hex'), Buffer.from(nextDerivedKey, 'hex'));
}
