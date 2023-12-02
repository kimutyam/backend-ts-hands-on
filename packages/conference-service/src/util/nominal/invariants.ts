import { pipe } from 'remeda';
import * as R from 'remeda';
import { NonEmptyReadonlyArray } from '../nonEmptyReadonlyArray';
import { InvariantsError } from './invariantsError';
import type { AnyNominal, NominalName, NominalValue } from './nominal';

export type InvariantUnit<N extends AnyNominal> = Readonly<{
  issue: string;

  isValid(v: NominalValue<N>): boolean;
}>;

export const InvariantUnit = <N extends AnyNominal>(
  isValid: (v: NominalValue<N>) => boolean,
  description: string,
): InvariantUnit<N> => ({
  issue: description,
  isValid,
});

export type Invariants<N extends AnyNominal> = {
  name: NominalName<N>;
  units: NonEmptyReadonlyArray<InvariantUnit<N>>;
};

const build = <N extends AnyNominal>(
  name: NominalName<N>,
  ...units: NonEmptyReadonlyArray<InvariantUnit<N>>
): Invariants<N> => ({
  name,
  units,
});

const buildSingle = <N extends AnyNominal>(
  name: NominalName<N>,
  isValid: (v: NominalValue<N>) => boolean,
  description: string,
): Invariants<N> => ({
  name,
  units: NonEmptyReadonlyArray.of({
    issue: description,
    isValid,
  }),
});

const validate =
  <N extends AnyNominal>(value: NominalValue<N>) =>
  (invariants: Invariants<N>): InvariantsError<N> | undefined =>
    pipe(
      invariants.units,
      R.filter((unit) => !unit.isValid(value)),
      R.map((unit) => unit.issue),
      (issues) =>
        NonEmptyReadonlyArray.isNonEmpty(issues)
          ? new InvariantsError(invariants.name, issues, value)
          : undefined,
    );

export const Invariants = {
  buildSingle,
  build,
  validate,
} as const;
