import { Builder } from './builder';
import type { Invariants } from './invariants';
import type { AnyNominal, NNominal, NominalName, NominalValue } from './nominal';

export interface Generator<N extends AnyNominal> {
  generate: () => NNominal<N>;
}

export const Generator =
  <N extends AnyNominal>(name: NominalName<N>, invariants: Invariants<N>) =>
  (fn: () => NominalValue<N>): Generator<N> => ({
    generate: () => Builder<N>(name, invariants).build(fn()),
  });
