import { isValid, monotonicFactory } from 'ulidx';
import type { Nominal } from '../50_nominal_builder/nominal';
import { Builder } from '../60_nominal_builder_assert/builder';
import { Invariants } from '../60_nominal_builder_assert/invariants';
import type { Eq } from '../80_entity/eq';
import { Generator } from './generator';

const name = 'ProductId';
export type ProductId = Nominal<typeof name, string>;
const invariants = Invariants.buildSingle<ProductId>(
  name,
  (value) => isValid(value),
  'ULIDで指定ください',
);

const equals: Eq<ProductId> = (x: ProductId, y: ProductId): boolean => x.value === y.value;

export const ProductId = {
  ...Builder<ProductId>(name, invariants),
  ...Generator<ProductId>(name, invariants)(monotonicFactory()),
  equals,
} as const;
