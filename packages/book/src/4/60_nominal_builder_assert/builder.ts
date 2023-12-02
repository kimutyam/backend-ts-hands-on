import assert from 'node:assert';
import type {
  AnyNominal,
  NNominal,
  NominalName,
  NominalValue,
} from '../50_nominal_builder/nominal';
import { Invariants } from './invariants';
import type { InvariantsError } from './invariantsError';

export interface Builder<N extends AnyNominal> {
  build(n: NominalValue<N>): NNominal<N>;
}

export const Builder = <N extends AnyNominal>(
  name: NominalName<N>,
  invariants: Invariants<N>,
): Builder<N> => ({
  build: (value: NominalValue<N>): NNominal<N> => {
    let error: InvariantsError<N> | undefined;
    assert((error = Invariants.validate(value)(invariants)) === undefined, error?.message);
    return {
      name,
      value,
    };
  },
});
