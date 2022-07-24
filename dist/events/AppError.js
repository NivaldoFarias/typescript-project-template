import AppLog from './AppLog.js';
import AppError from './../config/error.js';
function ExceptionHandler(error, _req, res, _next) {
    const { log, statusCode, message, detail } = error;
    AppLog('Error', log);
    return error instanceof AppError
        ? res.status(statusCode).send({ message, detail })
        : res.status(500).send({
            message: `Internal server error`,
            detail: error,
        });
}
export { AppError };
export default ExceptionHandler;
