import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';

const name = 'DiscountRate';
export type DiscountRate = Nominal<typeof name, number>;
const buildInvariantDiscountRate = InvariantUnit<DiscountRate>;
const invariants = Invariants.build<DiscountRate>(
  name,
  NonEmptyReadonlyArray.of(
    buildInvariantDiscountRate((value) => Number.isInteger(value), '整数で指定ください'),
    buildInvariantDiscountRate((value) => value >= 3, '3%以上してください'),
    buildInvariantDiscountRate((value) => value <= 30, '30%以下してください'),
  ),
);

export const DiscountRate = {
  ...Builder<DiscountRate>(name, invariants),
};
