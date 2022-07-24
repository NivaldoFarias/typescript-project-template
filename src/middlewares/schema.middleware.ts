import { Schema } from 'joi';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

function validateSchema(schema: Schema, body: any) {
  const { error } = schema.validate(body, { abortEarly: false });

  if (error) {
    throw new AppError(
      'Invalid Input',
      422,
      'Invalid Input',
      error.details.map((detail) => detail.message.replaceAll(`"`, `'`)),
    );
  }

  return AppLog('Middleware', `Schema validated`);
}

export default validateSchema;
