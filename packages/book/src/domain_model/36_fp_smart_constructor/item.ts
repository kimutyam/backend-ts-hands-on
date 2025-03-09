import type { Product } from 'domain_model/20_fp/product.js';
import { Quantity } from 'domain_model/36_fp_smart_constructor/quantity.js';
import type { QuantityError } from 'domain_model/36_fp_smart_constructor/quantityError.js';
import type { Result } from 'neverthrow';

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
