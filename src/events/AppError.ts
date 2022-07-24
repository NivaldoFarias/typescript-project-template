import { Request, Response, NextFunction } from 'express';

import AppLog from './AppLog';
import AppError from './../config/error';

function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { log, statusCode, message, details } = error;

  AppLog('Error', log ?? message);
  return error instanceof AppError
    ? res.status(statusCode).send({ message, details })
    : res.status(500).send({
        message: `Internal server error`,
        details: error,
      });
}

export { AppError };
export default ExceptionHandler;
