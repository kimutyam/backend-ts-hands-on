const assertNever = (x: never): never => {
  throw new Error(
    `${x} is Unexpected value. Should have been never.`,
  );
};

export { assertNever };
