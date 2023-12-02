import type {
  AnyNominal,
  NNominal,
  NominalName,
  NominalValue,
} from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import type { Invariants } from '../60_nominal_builder_assert/invariants';

export interface Generator<N extends AnyNominal> {
  generate: () => NNominal<N>;
}

export const Generator =
  <N extends AnyNominal>(name: NominalName<N>, invariants: Invariants<N>) =>
  (generator: () => NominalValue<N>): Generator<N> => ({
    generate: () => Builder<N>(name, invariants).build(generator()),
  });
