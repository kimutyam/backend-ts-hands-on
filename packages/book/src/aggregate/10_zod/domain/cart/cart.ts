import { ok, Result } from 'neverthrow';
import * as z from 'zod';
import { buildFromZodDefault } from '../../util/result';
import { CustomerId } from '../customer/customerId';
import { ProductId } from '../product/productId';
import { Item } from './item';
import type { QuantityError, Quantity } from './quantity';

export declare const CartBrand: unique symbol;

const schemaWithoutRefinements = z
  .object({
    customerId: CustomerId.schema,
    items: z.array(Item.schema).readonly(),
  })
  .readonly()
  .brand(CartBrand);

export type Cart = z.infer<typeof schemaWithoutRefinements>;
export type CartInput = z.input<typeof schemaWithoutRefinements>;
export type CartError = z.ZodError<CartInput>;

const ItemsLimit = 10;

const countItems = ({ items }: Cart): number => items.length;

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ items }: Cart): number =>
  items.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ items }: Cart): number =>
  items.reduce((acc, item) => acc + Item.calculateTotal(item), 0);

const withinTotalPriceLimit = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

const schema = schemaWithoutRefinements
  .refine(
    (cart) => withinItemsLimit(cart),
    () => ({ message: `品目数上限 ${ItemsLimit} を上回っています` }),
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

const initBuild = (customerId: CustomerId): Cart => build({ customerId, items: [] });

const clear = (customerId: CustomerId): Cart => build({ customerId, items: [] });

// ルートから実行することで、不変条件を満たすための某。
const addItem =
  (targetItem: Item) =>
  (cart: Cart): Result<Cart, CartError | QuantityError> =>
    Result.combine(
      cart.items.map((item) =>
        ProductId.equals(item.productId, targetItem.productId)
          ? Item.add(targetItem.quantity)(item)
          : ok(item),
      ),
    ).andThen((items) => safeBuild({ customerId: cart.customerId, items }));

const removeItem =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const items = cart.items.filter((item) => item.productId !== productId);
    return build({ customerId: cart.customerId, items });
  };

const updateQuantity =
  (productId: ProductId, quantity: Quantity) =>
  (cart: Cart): Result<Cart, CartError> => {
    const items = cart.items.map((item) =>
      ProductId.equals(item.productId, productId)
        ? { productId, price: item.price, quantity }
        : item,
    );
    return safeBuild({ customerId: cart.customerId, items });
  };

export const Cart = {
  schema,
  initBuild,
  clear,
  addItem,
  removeItem,
  updateQuantity,
} as const;
