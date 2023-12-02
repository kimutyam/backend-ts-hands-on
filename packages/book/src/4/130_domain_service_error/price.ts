import type { DiscountRate } from '../120_domain_service_assert/discountRate';
import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import type { InvariantsError } from '../60_nominal_builder_assert/invariantsError';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';
import type { Result } from '../60_nominal_builder_assert/result';
import { SafeBuilder } from '../60_nominal_builder_assert/safeBuilder';

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

const builder = Builder<Price>(name, invariants);
const safeBuilder = SafeBuilder<Price>(name, invariants);

// NominalResultでなくて、普通にドメインエラーにすべきでは？
const discount =
  (rate: DiscountRate) =>
  (price: Price): Result<InvariantsError<Price>, Price> =>
    safeBuilder.safeBuild(Math.floor(price.value * ((100 - rate.value) / 100)));

export const Price = {
  ...builder,
  discount,
} as const;
