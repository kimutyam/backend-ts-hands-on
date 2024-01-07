export type Nominal<Name extends string, T> = {
  readonly name: Name;
  readonly value: T;
};

export type AnyNominal = Nominal<string, unknown>;
export type NominalName<N extends AnyNominal> = N['name'];
export type NominalValue<N extends AnyNominal> = N['value'];
export type NNominal<N extends AnyNominal> = Nominal<NominalName<N>, NominalValue<N>>;
