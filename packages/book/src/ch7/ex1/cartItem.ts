import type { Price } from 'ch7/ex1/price.js';
import type { ProductId } from 'ch7/ex1/productId.js';
import { Quantity } from 'ch7/ex1/quantity.js';

interface CartItem {
  readonly productId: ProductId;
  readonly quantity: Quantity;
  readonly price: Price;
}

const buildSingle = (productId: ProductId, price: Price): CartItem => ({
  productId,
  quantity: Quantity.build(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): CartItem => ({
    ...item,
    quantity: Quantity.build(item.quantity + quantity),
    price,
  });

const calculateTotal = ({ price, quantity }: CartItem): number =>
  price * quantity;

const identify = (x: CartItem, y: CartItem): boolean =>
  x.productId === y.productId;

const CartItem = {
  add,
  calculateTotal,
  buildSingle,
  identify,
} as const;

export { CartItem };
