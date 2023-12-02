import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from './builder';
import { Invariants, InvariantUnit } from './invariants';
import { NonEmptyReadonlyArray } from './nonEmptyReadonlyArray';
import { SafeBuilder } from './safeBuilder';

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

export const OrderQuantity = {
  ...Builder<OrderQuantity>(name, invariants),
  ...SafeBuilder<OrderQuantity>(name, invariants),
} as const;
