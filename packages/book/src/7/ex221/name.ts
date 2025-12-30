type Name = string;

const valueOf = (value: string): Name => value;

const Name = {
  valueOf,
} as const;

export { Name };
