interface Logger {
  log: (message: string) => void;
}

// 1
const create = (): Logger => ({
  log: (message: string) => {
    console.log(message);
  },
});

const Logger = {
  token: 'Logger',
  create,
} as const;

export { Logger };
