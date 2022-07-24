import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../utils/constants.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function requireToken(authorization: string) {
  const token = parseToken(authorization);
  let subject = null;

  try {
    const { sub } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    subject = sub;
  } catch (error: any) {
    throw new AppError(`Invalid token`, 403, `Invalid token`, error);
  }

  AppLog('Middleware', 'Valid token');
  return subject;
}

function parseToken(header: string) {
  return header.replace('Bearer ', '').trim() ?? null;
}

export default requireToken;
