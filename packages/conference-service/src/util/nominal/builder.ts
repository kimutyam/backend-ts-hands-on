import assert from 'node:assert';
import { Invariants } from './invariants';
import type { InvariantsError } from './invariantsError';
import type { AnyNominal, NNominal, NominalName, NominalValue } from './nominal';

export interface Builder<N extends AnyNominal> {
  build(n: NominalValue<N>): NNominal<N>;
}

export const Builder = <N extends AnyNominal>(
  name: NominalName<N>,
  invariants?: Invariants<N>,
): Builder<N> => ({
  build: (value: NominalValue<N>): NNominal<N> => {
    if (invariants !== undefined) {
      let error: InvariantsError<N> | undefined;
      assert((error = Invariants.validate(value)(invariants)) === undefined, error?.message);
    }
    return {
      name,
      value,
    };
  },
});
