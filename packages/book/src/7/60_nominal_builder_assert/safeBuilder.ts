import { pipe } from 'remeda';
import type {
  AnyNominal,
  NNominal,
  NominalName,
  NominalValue,
} from '../50_nominal_builder/nominal';
import { Invariants } from './invariants';
import type { InvariantsError } from './invariantsError';
import type { Result } from './result';
import { Failure, Success } from './result';

export interface SafeBuilder<N extends AnyNominal> {
  safeBuild(n: NominalValue<N>): Result<InvariantsError<N>, NNominal<N>>;
}

export const SafeBuilder = <N extends AnyNominal>(
  name: NominalName<N>,
  invariants: Invariants<N>,
): SafeBuilder<N> => ({
  safeBuild: (value: NominalValue<N>): Result<InvariantsError<N>, NNominal<N>> =>
    pipe(invariants, Invariants.validate(value), (invariantsError) =>
      invariantsError === undefined ? Success({ name, value }) : Failure(invariantsError),
    ),
});
