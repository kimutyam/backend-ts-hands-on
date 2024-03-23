import { ok, Result } from 'neverthrow';
import * as z from 'zod';
import { buildFromZodDefault } from '../../util/result';
import { CustomerId } from '../customer/customerId';
import type { Order } from '../order/order';
import type { OrderId } from '../order/orderId';
import { ProductId } from '../product/productId';
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
export type CartError = z.ZodError<CartInput>;

const OrderItemsLimit = 10;

const countOrderItems = ({ orderItems }: Cart): number => orderItems.length;

const withinOrderItemsLimit = (cart: Cart): boolean => countOrderItems(cart) <= OrderItemsLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, orderItem) => acc + orderItem.orderQuantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, orderItem) => acc + OrderItem.calculateTotal(orderItem), 0);

const withinTotalPriceLimit = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

const schema = schemaWithoutRefinements
  .refine(
    (cart) => withinOrderItemsLimit(cart),
    () => ({ message: `注文品目数上限 ${OrderItemsLimit} を上回っています` }),
  )
  .refine(
    (cart) => withinTotalQuantityLimit(cart),
    () => ({ message: `合計数量上限 ${TotalQuantityLimit} を上回っています` }),
  )
  .refine(
    (cart) => withinTotalPriceLimit(cart),
    () => ({ message: `合計金額上限 ${TotalPriceLimit} を上回っています` }),
  );

const build = (input: CartInput): Cart => schema.parse(input);
const safeBuild = (input: CartInput): Result<Cart, CartError> =>
  buildFromZodDefault(schema.safeParse(input));

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
    const cart = build({ customerId, orderItems: [] });
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
