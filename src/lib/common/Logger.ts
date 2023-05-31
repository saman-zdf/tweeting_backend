/* eslint-disable no-console */
const COLORS = {
  red: '\u001b[31m',
  green: '\u001b[32m',
  blue: '\u001b[34m',
  yellow: '\u001b[33m',
  reset: '\u001b[0m',
};

export const Logger = {
  log: (message: string) => {
    console.log('[' + COLORS.blue + 'LOG' + COLORS.reset + '] ' + message);
  },

  dir: (message: object) => {
    console.dir(message);
  },

  initial: (message: string) => {
    console.log(COLORS.blue + message + COLORS.reset);
  },
  error: (message: string) => {
    console.log(COLORS.red + message + COLORS.reset);
  },
  success: (message: string) => {
    console.log(COLORS.green + message + COLORS.reset);
  },
  endpoint: (httpVerb: string, status: number, endpoint: string) => {
    console.log(
      '[' +
        COLORS.blue +
        httpVerb +
        COLORS.reset +
        ']: ' +
        '(' +
        COLORS.yellow +
        `Status Code: ${status}` +
        COLORS.reset +
        ') ' +
        '[' +
        COLORS.green +
        `Endpoint: ${endpoint}` +
        COLORS.reset +
        ']',
    );
  },
  endpointError: (httpVerb: string, status: number, endpoint: string) => {
    console.log(
      '[' +
        COLORS.red +
        httpVerb +
        COLORS.reset +
        ']: ' +
        '(' +
        COLORS.yellow +
        `Status Code: ${status}` +
        COLORS.reset +
        ') ' +
        '[' +
        COLORS.blue +
        `Endpoint: ${endpoint}` +
        COLORS.reset +
        ']',
    );
  },
};
