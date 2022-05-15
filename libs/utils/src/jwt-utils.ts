import * as jwt from 'jsonwebtoken';

export function createAccessToken(
  email: string,
  secretKey: string,
  jwtTokenExpiry: string
) {
  const payload = { email };
  return jwt.sign(payload, secretKey, { expiresIn: jwtTokenExpiry });
}

export function createRefreshToken(email: string, secretKey: string) {
  const payload = { email };
  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}
