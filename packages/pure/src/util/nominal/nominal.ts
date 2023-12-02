type UniqueSymbol<Name extends string> = {
  readonly __name: Name;
  readonly __uniqueSymbol: unique symbol;
};

export type Nominal<Name extends string, T> = UniqueSymbol<Name> & T;
