import { Prisma } from '@prisma/client';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function register(data: Prisma.usersCreateInput) {
  await client.users.create({
    data,
  });
  return AppLog('Repository', 'User instance inserted');
}

async function findByEmail(email: string) {
  AppLog('Repository', 'User searched by email');

  return await client.users.findUnique({
    where: { email },
  });
}

export { register, findByEmail };
