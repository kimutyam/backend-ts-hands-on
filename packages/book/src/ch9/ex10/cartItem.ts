import { Price } from 'ch9/ex10/price.js';
import { ProductId } from 'ch9/ex10/productId.js';
import type { QuantityInput } from 'ch9/ex10/quantity.js';
import { Quantity } from 'ch9/ex10/quantity.js';
import * as z from 'zod';

const schema = z
  .object({
    // NOTE: Quantity.schemaと類似した定義になるため実装例は割愛
    productId: ProductId.schema,
    // NOTE: Quantity.schemaと類似した定義になるため実装例は割愛
    price: Price.schema,
    quantity: Quantity.schema,
  })
  .readonly();

type CartItem = z.infer<typeof schema>;

const buildSingle = (productId: ProductId, price: Price): CartItem => ({
  productId,
  quantity: Quantity.build(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): CartItem | z.ZodError<QuantityInput> => {
    const result = Quantity.safeBuild(item.quantity + quantity);
    return result.success
      ? {
          ...item,
          quantity: result.data,
          price,
        }
      : result.error;
  };

const calculateTotal = ({ price, quantity }: CartItem): number =>
  price * quantity;

const identify = (x: CartItem, y: CartItem): boolean =>
  x.productId === y.productId;

const CartItem = {
  schema,
  add,
  calculateTotal,
  buildSingle,
  identify,
} as const;

export { CartItem };
