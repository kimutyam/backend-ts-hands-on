export type Nominal<Name extends string, T> = {
  readonly name: Name;
  readonly value: T;
};
