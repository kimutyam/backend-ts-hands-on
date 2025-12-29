const assertNever = (x: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`${x} is unexpected value. Should have been never.`);
};

export { assertNever };
