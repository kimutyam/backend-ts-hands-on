import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';
import type { Eq } from '../80_entity/eq';
import type { DiscountRate } from './discountRate';

const name = 'Price';
export type Price = Nominal<typeof name, number>;
const buildInvariantPrice = InvariantUnit<Price>;
const invariants = Invariants.build<Price>(
  name,
  NonEmptyReadonlyArray.of(
    buildInvariantPrice((value) => Number.isInteger(value), '整数で指定ください'),
    buildInvariantPrice((value) => value >= 100, '100円以上してください'),
  ),
);

const builder = Builder(name, invariants);

const discount =
  (rate: DiscountRate) =>
  (price: Price): Price =>
    builder.build(Math.floor(price.value * ((100 - rate.value) / 100)));

const equals: Eq<Price> = (x: Price, y: Price): boolean => x.value === y.value;

export const Price = {
  ...builder,
  discount,
  equals,
} as const;
