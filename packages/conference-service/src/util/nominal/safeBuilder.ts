import { pipe } from 'remeda';
import { Failure, Success } from '../result';
import { Invariants } from './invariants';
import type { AnyNominal, NominalName, NominalValue } from './nominal';
import type { NominalResult } from './nominalResult';

export interface SafeBuilder<N extends AnyNominal> {
  safeBuild(n: NominalValue<N>): NominalResult<N>;
}

export const SafeBuilder = <N extends AnyNominal>(
  name: NominalName<N>,
  invariants: Invariants<N>,
): SafeBuilder<N> => ({
  safeBuild: (value: NominalValue<N>): NominalResult<N> =>
    pipe(invariants, Invariants.validate(value), (invariantsError) =>
      invariantsError === undefined ? Success({ name, value }) : Failure(invariantsError),
    ),
});
