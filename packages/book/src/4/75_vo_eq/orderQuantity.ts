import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';
import type { Eq } from './eq';

const name = 'OrderQuantity';
export type OrderQuantity = Nominal<typeof name, number>;
const buildInvariantUnit = InvariantUnit<OrderQuantity>;
const invariants = Invariants.build<OrderQuantity>(
  name,
  NonEmptyReadonlyArray.of(
    buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
    buildInvariantUnit((value) => value >= 1, '1個以上にしてください'),
    buildInvariantUnit((value) => value <= 10, '1つの注文に含められるのは10個までです'),
  ),
);

const equals: Eq<OrderQuantity> = (x: OrderQuantity, y: OrderQuantity): boolean =>
  x.value === y.value;

export const OrderQuantity = {
  ...Builder<OrderQuantity>(name, invariants),
  equals,
} as const;
