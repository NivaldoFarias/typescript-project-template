import jwt, { Algorithm, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

import { env } from "../utils/constants.util";
import AppLog from "../events/AppLog";

export function hashPassword(password: string) {
  const encrypted = bcrypt.hashSync(password, env.SALT_ROUNDS);

  AppLog.service("Password encrypted.");
  return encrypted;
}

export function decryptPassword(password: string, encrypted: string) {
  const isValid = bcrypt.compareSync(password, encrypted);

  AppLog.service("Password decrypted.");
  return isValid;
}

export function generateToken(id: number) {
  const data = {};
  const subject = id.toString();
  const secretKey = env.JWT_SECRET;
  const expiresIn = env.JWT_EXPIRES_IN;

  const algorithm = env.JWT_ALGORITHM as Algorithm;
  const config: SignOptions = { algorithm, expiresIn, subject };

  const token = jwt.sign(data, secretKey, config);

  AppLog.service("Token generated.");
  return token;
}
