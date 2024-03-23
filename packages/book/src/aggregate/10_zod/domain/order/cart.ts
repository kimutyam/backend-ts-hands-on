import { ok, Result } from 'neverthrow';
import * as z from 'zod';
import { buildFromZodDefault } from '../../util/result';
import { CustomerId } from '../customer/customerId';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';
import { OrderItem } from './orderItem';
import type { OrderQuantityError, OrderQuantity } from './orderQuantity';

export declare const CartBrand: unique symbol;

const schemaWithoutRefinements = z
  .object({
    customerId: CustomerId.schema,
    orderItems: z.array(OrderItem.schema).readonly(),
  })
  .readonly()
  .brand(CartBrand);

export type Cart = z.infer<typeof schemaWithoutRefinements>;
export type CartInput = z.input<typeof schemaWithoutRefinements>;

const CartLimit = 10;

const countOrderItems = ({ orderItems }: Cart): number => orderItems.length;

const withinCartLimit = (cart: Cart): boolean => countOrderItems(cart) <= CartLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + oi.orderQuantity, 0);

const withinTotalQuantity = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + OrderItem.calculateTotal(oi), 0);

const withinTotalPrice = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

const schema = schemaWithoutRefinements
  .refine(
    (cart) => withinCartLimit(cart),
    () => ({ message: `カート上限 ${CartLimit} を上回っています` }),
  )
  .refine(
    (cart) => withinTotalQuantity(cart),
    () => ({ message: `注文数上限 ${TotalQuantityLimit} を上回っています` }),
  )
  .refine(
    (cart) => withinTotalPrice(cart),
    () => ({ message: `購入金額上限 ${TotalPriceLimit} を上回っています` }),
  );

export type CartError = z.ZodError<CartInput>;

const build = (a: CartInput): Cart => schema.parse(a);
const safeBuild = (a: CartInput): Result<Cart, CartError> =>
  buildFromZodDefault(schema.safeParse(a));

const init = (customerId: CustomerId): Cart => build({ customerId, orderItems: [] });

// ルートから実行することで、不変条件を満たすための某。
const addOrderItem =
  (targetOrderItem: OrderItem) =>
  (cart: Cart): Result<Cart, CartError | OrderQuantityError> =>
    Result.combine(
      cart.orderItems.map((orderItem) =>
        ProductId.equals(orderItem.productId, targetOrderItem.productId)
          ? OrderItem.add(targetOrderItem.orderQuantity)(orderItem)
          : ok(orderItem),
      ),
    ).andThen((orderItems) => safeBuild({ customerId: cart.customerId, orderItems }));

const removeOrderItem =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const orderItems = cart.orderItems.filter((orderItem) => orderItem.productId !== productId);
    return build({ customerId: cart.customerId, orderItems });
  };

const updateOrderQuantity =
  (productId: ProductId, orderQuantity: OrderQuantity) =>
  (cart: Cart): Result<Cart, CartError> => {
    const orderItems = cart.orderItems.map((orderItem) =>
      ProductId.equals(orderItem.productId, productId)
        ? { productId, price: orderItem.price, orderQuantity }
        : orderItem,
    );
    return safeBuild({ customerId: cart.customerId, orderItems });
  };

const submitOrder =
  (generateOrderId: () => OrderId) =>
  ({ customerId, orderItems }: Cart): [Order, Cart] => {
    const order = {
      orderId: generateOrderId(),
      customerId,
      orderItems,
    };
    const cart = init(customerId);
    return [order, cart];
  };

export const Cart = {
  schema,
  countOrderItems,
  addOrderItem,
  removeOrderItem,
  updateOrderQuantity,
  submitOrder,
} as const;
