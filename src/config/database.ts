import { PrismaClient } from "@prisma/client";

import AppLog from "./../events/AppLog";
import "./setup";

const client = new PrismaClient();
connectToDatabase();

async function connectToDatabase() {
  try {
    await client.$connect();
    AppLog.server("Successfully connected to Database.");
  } catch (error) {
    AppLog.error(`${error}`);
  }
}

export default client;
