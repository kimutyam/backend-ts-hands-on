interface Logger {
  log: (message: string) => void;
}

const Logger = {
  token: 'Logger',
} as const;

export { Logger };
