import AppError from '../config/error';
import AppLog from '../events/AppLog';

function processHeader(header: string | undefined) {
  if (!header) {
    throw new AppError(
      'Missing headers',
      400,
      'Missing headers',
      'Ensure to provide the necessary headers',
    );
  }

  return AppLog('Middleware', `Header processed`);
}

export default processHeader;
