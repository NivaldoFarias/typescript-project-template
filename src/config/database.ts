import { PrismaClient } from '@prisma/client';

import AppLog from './../events/AppLog';
import './setup';

const client = new PrismaClient();
connectToDatabase();

export default client;

async function connectToDatabase() {
  try {
    await client.$connect();
    AppLog('Server', 'Connected to database');
  } catch (error) {
    AppLog('Error', `${error}`);
  }
}
