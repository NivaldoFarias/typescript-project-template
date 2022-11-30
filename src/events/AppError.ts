import { Request, Response, NextFunction } from "express";

import AppLog from "./AppLog";
import AppError from "./../config/error";

export { AppError };

export default function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { log, statusCode, message, details } = error;

  AppLog.error(log ?? message);
  return error instanceof AppError
    ? res.status(statusCode).send({ message, details })
    : res.status(500).send({
        message: `Internal server error`,
        details: error,
      });
}
