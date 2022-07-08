import chalk from 'chalk';

import LogTypes from './../interfaces/index';

const types: LogTypes = {
  Middleware: 'magenta',
  Controller: 'green',
  Repository: 'blue',
  Server: 'yellow',
  Service: 'cyan',
  Error: 'red',
  Util: 'cyan',
};
const AppLog = (
  type:
    | 'Middleware'
    | 'Controller'
    | 'Repository'
    | 'Server'
    | 'Service'
    | 'Error',
  text: string,
) => {
  console.log(
    chalk.bold[
      types[type] as 'green' | 'magenta' | 'blue' | 'yellow' | 'cyan' | 'red'
    ](`[${type}] ${text}`),
  );
};

export default AppLog;
