import assert from 'assert';
import { pipe } from 'remeda';
import * as R from 'remeda';
import { NonEmptyReadonlyArray } from '../nonEmptyReadonlyArray';
import type { InvariantsError } from './invariantsError';
import { InvariantsErrorFn } from './invariantsError';
import type { AnyNominal, NominalName, NominalValue } from './nominal';

export type InvariantUnit<N extends AnyNominal> = Readonly<{
  description: string;

  isValid(v: NominalValue<N>): boolean;
}>;

export const InvariantUnit = <N extends AnyNominal>(
  isValid: (v: NominalValue<N>) => boolean,
  description: string,
): InvariantUnit<N> => ({
  description,
  isValid,
});

export type Invariants<N extends AnyNominal> = {
  name: NominalName<N>;
  units: NonEmptyReadonlyArray<InvariantUnit<N>>;
};

const buildMulti = <N extends AnyNominal>(
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
    description,
    isValid,
  }),
});

const getFailures =
  <N extends AnyNominal>(value: NominalValue<N>) =>
  ({ units }: Invariants<N>): Array<string> =>
    pipe(
      units,
      R.filter((unit) => !unit.isValid(value)),
      R.map((unit) => unit.description),
    );

const validate =
  <N extends AnyNominal>(value: NominalValue<N>) =>
  (invariants: Invariants<N>): InvariantsError<N> | undefined =>
    pipe(invariants, getFailures(value), (descriptions) =>
      NonEmptyReadonlyArray.isNonEmpty(descriptions)
        ? InvariantsErrorFn(invariants.name, descriptions)(value)
        : undefined,
    );

function internalAssert<N extends AnyNominal>(
  value: NominalValue<N>,
  invariants: Invariants<N>,
): asserts value is NominalValue<N> {
  return pipe(invariants, getFailures(value), (descriptions) =>
    assert(descriptions.length === 0, descriptions.join('\n')),
  );
}
const assertInvariants =
  <N extends AnyNominal>(value: NominalValue<N>) =>
  (invariants: Invariants<N>): void =>
    internalAssert(value, invariants);

export const Invariants = {
  buildSingle,
  buildMulti,
  validate,
  assert: assertInvariants,
} as const;
