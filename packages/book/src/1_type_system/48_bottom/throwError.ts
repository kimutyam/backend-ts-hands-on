const throwError = (message: string): never => {
  throw new Error(message);
};

export { throwError };
