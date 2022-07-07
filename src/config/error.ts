class AppError {
  log;
  statusCode;
  message;
  detail;

  constructor(
    log: string = 'Something went wrong',
    statusCode: number = 400,
    message: string = 'Something went wrong',
    detail: string = 'An unexpected error occurred',
  ) {
    this.log = log;
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}

export default AppError;
