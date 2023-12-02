import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';

const name = 'Price';
export type Price = Nominal<typeof name, number>;
const buildInvariantUnit = InvariantUnit<Price>;
const invariants = Invariants.build<Price>(
  name,
  NonEmptyReadonlyArray.of(
    buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
    buildInvariantUnit((value) => value >= 1000, '1000円以上にしてください'),
  ),
);
export const Price = {
  ...Builder(name, invariants),
} as const;
