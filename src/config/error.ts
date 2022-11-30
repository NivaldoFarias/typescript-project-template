export default class AppError {
  constructor(
    public log: string,
    public statusCode: number,
    public message: string,
    public details: string | {} | string[],
  ) {
    this.log = log;
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
