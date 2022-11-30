import chalk from "chalk";

import { Logs, LogTypes } from "../types/log";

const types: Logs = {
  Middleware: "magenta",
  Controller: "green",
  Repository: "blue",
  Server: "yellow",
  Service: "cyan",
  Util: "cyan",
  Error: "red",
};
const withChalk = (type: LogTypes, text: string) => {
  const color = types[type] as
    | "green"
    | "magenta"
    | "blue"
    | "yellow"
    | "cyan"
    | "red";

  return console.log(chalk.bold[color](`[${type}] ${text}`));
};

/**
 * Logs the message to the console with a corresponding color and prefix.
 *
 * @param text The message to log.
 *
 * @example
 * ```ts
 * AppLog.middleware("Token validated.");
 * ```
 */
const AppLog = {
  middleware: (text: string) => withChalk("Middleware", text),
  controller: (text: string) => withChalk("Controller", text),
  repository: (text: string) => withChalk("Repository", text),
  server: (text: string) => withChalk("Server", text),
  service: (text: string) => withChalk("Service", text),
  util: (text: string) => withChalk("Util", text),
  error: (text: string) => withChalk("Error", text),
};

export default AppLog;
