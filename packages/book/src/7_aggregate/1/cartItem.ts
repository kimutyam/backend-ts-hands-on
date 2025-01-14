import type { Price } from './price';
import type { ProductId } from './productId';
import { Quantity } from './quantity';

interface CartItem {
  readonly productId: ProductId;
  readonly quantity: Quantity;
  readonly price: Price;
}

const add =
  (quantity: number) =>
  (item: CartItem): CartItem => ({
    ...item,
    quantity: Quantity.build(item.quantity + quantity),
  });

const calculateTotal = ({ price, quantity }: CartItem): number => price * quantity;

const buildSingle = (productId: ProductId, price: Price): CartItem => ({
  productId,
  quantity: Quantity.build(1),
  price,
});

const identify = (x: CartItem, y: CartItem): boolean => x.productId === y.productId;

const CartItem = {
  add,
  calculateTotal,
  buildSingle,
  identify,
} as const;

export { CartItem };
