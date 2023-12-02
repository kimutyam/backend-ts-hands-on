import type { NonEmptyReadonlyArray } from '../nonEmptyReadonlyArray';
import type { AnyNominal, NominalName, NominalValue } from './nominal';

const kind = 'InvariantsError';
export type InvariantsError<N extends AnyNominal> = Readonly<{
  kind: typeof kind;
  name: NominalName<N>;
  descriptions: NonEmptyReadonlyArray<string>;
  value: NominalValue<N>;
}>;

export type InvariantsErrorFn<N extends AnyNominal> = (v: NominalValue<N>) => InvariantsError<N>;

export const InvariantsErrorFn =
  <N extends AnyNominal>(
    name: NominalName<N>,
    descriptions: NonEmptyReadonlyArray<string>,
  ): InvariantsErrorFn<N> =>
  (value: NominalValue<N>) => ({
    kind,
    name,
    descriptions,
    value,
  });
