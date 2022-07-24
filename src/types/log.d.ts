interface Logs {
  [key: string]: string;
}

type LogTypes =
  | 'Middleware'
  | 'Controller'
  | 'Repository'
  | 'Server'
  | 'Service'
  | 'Util'
  | 'Error';

export { Logs, LogTypes };
