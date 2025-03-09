type Name = string;

const build = (value: string): Name => value;

const Name = {
  build,
} as const;

export { Name };
