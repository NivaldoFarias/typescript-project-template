import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import "../config/setup";

import AppLog from "../events/AppLog";

import * as repository from "./../repositories/auth.repository";
import * as service from "./../services/auth.service";

export async function register(_req: Request, res: Response) {
  const body: Prisma.usersCreateInput = res.locals.body;
  const password = service.hashPassword(body.password);

  const data = {
    ...body,
    password,
  };
  await repository.register(data);

  AppLog.controller("User signed up.");
  return res.sendStatus(201);
}

export function signIn(_req: Request, res: Response) {
  const {
    user: { id },
  } = res.locals;

  const token = service.generateToken(id);

  AppLog.controller("User signed in.");
  return res.status(200).send({ token });
}
