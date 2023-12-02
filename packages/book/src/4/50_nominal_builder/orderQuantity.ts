import type { Nominal, NominalName, NominalValue } from '../50_nominal_builder/nominal';
import { Builder } from './builder';

const name = 'OrderQuantity';
export type OrderQuantity = Nominal<typeof name, number>;

// 'OrderQuantity'型として評価される
export type Name = NominalName<OrderQuantity>;
// number型として評価される
export type Value = NominalValue<OrderQuantity>;

const builder = Builder<OrderQuantity>(name);
builder.build(1);

// TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
// builder.build('string');

export const OrderQuantity = {
  ...Builder<OrderQuantity>(name),
} as const;

OrderQuantity.build(1);
