import type { AnyNominal, NNominal, NominalName, NominalValue } from './nominal';

export interface Builder<N extends AnyNominal> {
  build(n: NominalValue<N>): NNominal<N>;
}
export const Builder = <N extends AnyNominal>(name: NominalName<N>): Builder<N> => ({
  build: (value: NominalValue<N>): NNominal<N> => ({
    name,
    value,
  }),
});
