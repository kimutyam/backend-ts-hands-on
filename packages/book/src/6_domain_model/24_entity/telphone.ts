type Telephone = string;

const build = (value: string): Telephone => value;

const Telephone = {
  build,
} as const;

export { Telephone };
