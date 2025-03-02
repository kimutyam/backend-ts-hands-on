import type { Result } from 'neverthrow';
import type { Product } from '../20_fp/product.js';
import { Quantity } from './quantity.js';
import type { QuantityError } from './quantityError.js';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const add =
  (quantity: Quantity) =>
  (item: Item): Result<Item, QuantityError> =>
    Quantity.safeBuild(item.quantity + quantity).map(
      (newQuantity) => ({
        ...item,
        quantity: newQuantity,
      }),
    );

const calculateTotal = ({
  product,
  quantity,
}: Item): number => product.price * quantity;

const build = (
  product: Product,
  quantity: Quantity,
): Item => ({
  product,
  quantity: Quantity.build(quantity),
});

const safeBuild = (
  product: Product,
  quantity: Quantity,
): Result<Item, QuantityError> =>
  Quantity.safeBuild(quantity).map((q) =>
    Item.build(product, q),
  );

const buildSingle = (product: Product): Item => ({
  product,
  quantity: Quantity.build(1),
});

export const Item = {
  build,
  buildSingle,
  safeBuild,
  add,
  total: calculateTotal,
} as const;
