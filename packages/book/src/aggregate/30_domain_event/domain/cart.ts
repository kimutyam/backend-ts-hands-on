import { ok, Result } from 'neverthrow';
import { pipe } from 'remeda';
import { z } from 'zod';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Item } from '../../10_zod/domain/cart/item';
import type { Quantity, QuantityError } from '../../10_zod/domain/cart/quantity';
import { CustomerId } from '../../10_zod/domain/customer/customerId';
import { ProductId } from '../../10_zod/domain/product/productId';
import { buildFromZodDefault } from '../../10_zod/util/result';
import { Aggregate } from './aggregate';
import { CartItemAdded, CartCleared, CartItemQuantityUpdated, CartItemRemoved } from './cartEvent';
import { DomainEvent } from './domainEvent';

const aggregateName = 'Cart';

const schema = Aggregate.schema(
  CustomerId.schema,
  z.object({
    customerId: CustomerId.schema,
    items: z.array(Item.schema).readonly(),
  }),
).readonly();

export type Cart = z.infer<typeof schema>;
export type CartInput = z.input<typeof schema>;

const build = (input: CartInput): Cart => schema.parse(input);

const safeBuild = (input: CartInput): Result<Cart, CartError> =>
  buildFromZodDefault(schema.safeParse(input));

export const initBuild =
  (customerId: CustomerId) =>
  (cart: Cart): Cart =>
    build({ ...cart, customerId, items: [] });

export const clear =
  (customerId: CustomerId) =>
  (cart: Cart): [Cart, CartCleared] => {
    const newCart = build({ ...cart, customerId, items: [] });
    const event = pipe(newCart, DomainEvent.build(CartCleared.name, aggregateName, {}));
    return [newCart, event];
  };

export const addItem =
  (targetItem: Item) =>
  (cart: Cart): Result<[Cart, CartItemAdded], CartError | QuantityError> =>
    Result.combine(
      cart.items.map((item) =>
        ProductId.equals(item.productId, targetItem.productId)
          ? Item.add(targetItem.quantity)(item)
          : ok(item),
      ),
    )
      .andThen((items) => safeBuild({ ...cart, customerId: cart.customerId, items }))
      .map((newCart) => {
        const event = pipe(
          newCart,
          DomainEvent.build(CartItemAdded.name, aggregateName, { item: targetItem }),
        );
        return [newCart, event];
      });

export const removeItem =
  (productId: ProductId) =>
  (cart: Cart): [Cart, CartItemRemoved] => {
    const items = cart.items.filter((item) => item.productId !== productId);
    const newCart = build({ ...cart, customerId: cart.customerId, items });
    const event = pipe(
      newCart,
      DomainEvent.build(CartItemRemoved.name, aggregateName, { productId }),
    );
    return [newCart, event];
  };

export const updateItemQuantity =
  (productId: ProductId, quantity: Quantity) =>
  (cart: Cart): Result<[Cart, CartItemQuantityUpdated], CartError> => {
    const items = cart.items.map((item) =>
      ProductId.equals(item.productId, productId)
        ? { productId, price: item.price, quantity }
        : item,
    );
    return safeBuild({ ...cart, customerId: cart.customerId, items }).map((newCart) => {
      const event = pipe(
        newCart,
        DomainEvent.build(CartItemQuantityUpdated.name, aggregateName, { productId, quantity }),
      );
      return [newCart, event];
    });
  };

export const Cart = {
  schema,
  initBuild,
  clear,
  addItem,
  removeItem,
  updateItemQuantity,
} as const;
