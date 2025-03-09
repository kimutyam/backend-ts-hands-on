import type { Eq } from 'domain_model/999_fully/eq.js';
import { Product } from 'domain_model/999_fully/product.js';
import { Quantity } from 'domain_model/999_fully/quantity.js';
import type { QuantityError } from 'domain_model/999_fully/quantityError.js';
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

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.isSameIdentity(x.product, y.product) &&
  Quantity.equals(x.quantity, y.quantity);

export const Item = {
  equals,
  build,
  safeBuild,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
