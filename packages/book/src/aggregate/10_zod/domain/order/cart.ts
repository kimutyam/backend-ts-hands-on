import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import * as z from 'zod';
import { fromZodReturnTypeDefault } from '../../../../branded_type/50_zod_vo/resultBuilder';
import { CustomerId } from '../customer/customerId';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';
import { OrderItem } from './orderItem';
import type { OrderQuantityError } from './orderQuantity';
import { OrderQuantity } from './orderQuantity';

const schemaWithoutRefinements = z
  .object({
    customerId: CustomerId.schema,
    orderItems: z.array(OrderItem.schema).readonly(),
  })
  .readonly();

export type Cart = z.infer<typeof schemaWithoutRefinements>;
export type CartInput = z.input<typeof schemaWithoutRefinements>;

const CartLimit = 10;

const countOrderItems = ({ orderItems }: Cart): number => orderItems.length;

const withinCartLimit = (cart: Cart): boolean => countOrderItems(cart) <= CartLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + oi.quantity, 0);

const withinTotalQuantity = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + OrderItem.calculateTotal(oi), 0);

const withinTotalPrice = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

export const uniqueByProduct = ({ customerId, orderItems }: Cart): Cart => {
  const uniqueOrderItems = R.pipe(
    orderItems,
    R.uniqBy((oi) => oi.productId),
  );
  return { customerId, orderItems: uniqueOrderItems };
};

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
  fromZodReturnTypeDefault(schema.safeParse(a));

const init = (customerId: CustomerId): Cart => ({
  customerId,
  orderItems: [],
});

// ルートから実行することで、不変条件を満たすための某。
const addProduct =
  (productId: ProductId) =>
  (cart: Cart): Result<Cart, CartError | OrderQuantityError> =>
    Result.combine(
      cart.orderItems.map((orderItem) =>
        ProductId.equals(orderItem.productId, productId)
          ? OrderItem.add(OrderQuantity.build(1))(orderItem)
          : ok(orderItem),
      ),
    ).andThen((orderItems) => safeBuild({ customerId: cart.customerId, orderItems }));

const removeProduct =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const orderItems = cart.orderItems.filter((orderItem) => orderItem.productId !== productId);
    return build({ customerId: cart.customerId, orderItems });
  };

const updateQuantity =
  (productId: ProductId, quantity: OrderQuantity) =>
  (cart: Cart): Result<Cart, CartError> => {
    const orderItems = cart.orderItems.map((orderItem) =>
      ProductId.equals(orderItem.productId, productId)
        ? { productId, price: orderItem.price, quantity }
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
  addProduct,
  removeProduct,
  updateQuantity,
  submitOrder,
} as const;
