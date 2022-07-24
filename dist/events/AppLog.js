import chalk from 'chalk';
const types = {
    Middleware: 'magenta',
    Controller: 'green',
    Repository: 'blue',
    Server: 'yellow',
    Service: 'cyan',
    Error: 'red',
};
const AppLog = (type, text) => {
    console.log(chalk.bold[types[type]](`[${type}] ${text}`));
};
export default AppLog;
