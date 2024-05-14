import { ok, Result } from 'neverthrow';
import * as z from 'zod';
import { buildFromZodDefault } from '../../util/result';
import { Aggregate } from '../aggregate';
import { CustomerId } from '../customer/customerId';
import { Item } from '../item/item';
import type { QuantityError, Quantity } from '../item/quantity';
import { ProductId } from '../product/productId';

export declare const CartBrand: unique symbol;

const schemaWithoutRefinements = Aggregate.makeSchema(
  CustomerId.schema,
  z
    .object({
      items: z.array(Item.schema).readonly(),
    })
    .readonly(),
).brand(CartBrand);

// type Cart = {
//   aggregateId: string & z.BRAND<typeof CustomerIdBrand>;
//   props: Readonly<{
//     items: readonly Readonly<{
//       productId: string & z.BRAND<typeof ProductIdBrand>;
//       price: number & z.BRAND<typeof PriceBrand>;
//       quantity: number & z.BRAND<typeof QuantityBrand>;
//     }>[];
//   }>;
// } & z.BRAND<typeof CartBrand>
export type Cart = z.infer<typeof schemaWithoutRefinements>;
export type CartInput = z.input<typeof schemaWithoutRefinements>;
export type CartError = z.ZodError<CartInput>;

const ItemsLimit = 10;

const countItems = ({ props }: Cart): number => props.items.length;

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ props }: Cart): number =>
  props.items.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ props }: Cart): number =>
  props.items.reduce((acc, item) => acc + Item.calculateTotal(item), 0);

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

const initBuild = (aggregateId: CustomerId): Cart => build({ aggregateId, props: { items: [] } });

const addItem =
  (targetItem: Item) =>
  (cart: Cart): Result<Cart, CartError | QuantityError> => {
    const { props } = cart;
    return Result.combine(
      props.items.map((item) =>
        ProductId.equals(item.productId, targetItem.productId)
          ? Item.add(targetItem.quantity)(item)
          : ok(item),
      ),
    ).andThen((items) => safeBuild({ ...cart, props: { items } }));
  };

const removeItem =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const { props } = cart;
    const items = props.items.filter((item) => item.productId !== productId);
    return build({ ...cart, props: { items } });
  };

const updateItemQuantity =
  (productId: ProductId, quantity: Quantity) =>
  (cart: Cart): Result<Cart, CartError> => {
    const { props } = cart;
    const items = props.items.map((item) =>
      ProductId.equals(item.productId, productId)
        ? { productId, price: item.price, quantity }
        : item,
    );
    return safeBuild({ ...cart, props: { items } });
  };

const clearOnOrder = (cart: Cart): Cart => build({ ...cart, props: { items: [] } });

export const Cart = {
  schema,
  initBuild,
  clearOnOrder,
  addItem,
  removeItem,
  updateItemQuantity,
} as const;
