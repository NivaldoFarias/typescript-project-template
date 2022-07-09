import { Request, Response, NextFunction } from 'express';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

function processHeader(header: string, endpoint: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.header(header);

    if (!data) {
      throw new AppError(
        'Missing headers',
        400,
        'Missing headers',
        'Ensure to provide the necessary headers',
      );
    }

    AppLog('Middleware', `Header for endpoint ${endpoint} processed`);
    res.locals.header = data;
    return next();
  };
}

export default processHeader;
