class AppError {
  log: string;
  statusCode: number;
  message: string;
  details: string | {} | string[];

  constructor(
    log: string,
    statusCode: number,
    message: string,
    details: string | {} | string[],
  ) {
    this.log = log;
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export default AppError;
