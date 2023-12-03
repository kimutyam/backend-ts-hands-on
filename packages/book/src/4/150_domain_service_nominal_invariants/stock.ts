import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants, InvariantUnit } from '../60_nominal_builder_assert/invariants';
import type { InvariantsError } from '../60_nominal_builder_assert/invariantsError';
import { NonEmptyReadonlyArray } from '../60_nominal_builder_assert/nonEmptyReadonlyArray';
import type { Result } from '../60_nominal_builder_assert/result';
import { SafeBuilder } from '../60_nominal_builder_assert/safeBuilder';

const name = 'Stock';
export type Stock = Nominal<typeof name, number>;
const buildInvariantUnit = InvariantUnit<Stock>;
const invariants = Invariants.build<Stock>(
  name,
  NonEmptyReadonlyArray.of(
    buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
    buildInvariantUnit((value) => value >= 1, '1個以上にしてください'),
  ),
);

const builder = Builder<Stock>(name, invariants);
const safeBuilder = SafeBuilder<Stock>(name, invariants);

const minus =
  (n: number) =>
  (stock: Stock): Result<InvariantsError<Stock>, Stock> =>
    safeBuilder.safeBuild(stock.value - n);

const init = builder.build(0);

export const Stock = {
  ...Builder<Stock>(name, invariants),
  ...safeBuilder,
  init,
  minus,
};
