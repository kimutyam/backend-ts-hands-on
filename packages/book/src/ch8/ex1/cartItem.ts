import type { Price } from './price.js';
import type { ProductId } from './productId.js';
import { Quantity } from './quantity.js';

interface CartItem {
  readonly productId: ProductId;
  readonly quantity: Quantity;
  readonly price: Price;
}

const createSingleQuantity = (
  productId: ProductId,
  price: Price,
): CartItem => ({
  productId,
  quantity: Quantity.valueOf(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): CartItem => ({
    ...item,
    quantity: Quantity.valueOf(item.quantity + quantity),
    price,
  });

const calculateTotal = (item: CartItem): number => {
  const { price, quantity } = item;
  return price * quantity;
};

const identify = (x: CartItem, y: CartItem): boolean =>
  x.productId === y.productId;

const CartItem = {
  add,
  calculateTotal,
  createSingleQuantity,
  identify,
} as const;

export { CartItem };
