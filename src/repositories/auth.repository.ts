import { Prisma } from "@prisma/client";

import client from "../config/database";
import AppLog from "../events/AppLog";

export async function register(data: Prisma.usersCreateInput) {
  await client.users.create({
    data,
  });
  return AppLog.repository("User instance inserted.");
}

export async function findByEmail(email: string) {
  AppLog.repository("User searched by email.");

  return await client.users.findUnique({
    where: { email },
  });
}
