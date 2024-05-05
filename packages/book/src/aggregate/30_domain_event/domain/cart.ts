import { ok, Result } from 'neverthrow';
import { pipe } from 'remeda';
import { z } from 'zod';
import { Item } from '../../10_zod/domain/cart/item';
import type { Quantity, QuantityError } from '../../10_zod/domain/cart/quantity';
import { CustomerId } from '../../10_zod/domain/customer/customerId';
import { ProductId } from '../../10_zod/domain/product/productId';
import { buildFromZodDefault } from '../../10_zod/util/result';
import { Aggregate } from './aggregate';
import { CartItemAdded, CartCleared, CartItemQuantityUpdated, CartItemRemoved } from './cartEvent';
import { DomainEvent } from './domainEvent';

const aggregateName = 'Cart';

export declare const CartBrand: unique symbol;

const schema = Aggregate.makeSchema(
  CustomerId.schema,
  z
    .object({
      items: z.array(Item.schema).readonly(),
    })
    .readonly(),
).brand(CartBrand);

export type Cart = z.infer<typeof schema>;
export type CartInput = z.input<typeof schema>;
export type CartError = z.ZodError<CartInput>;

const build = (input: CartInput): Cart => schema.parse(input);

const safeBuild = (input: CartInput): Result<Cart, CartError> =>
  buildFromZodDefault(schema.safeParse(input));

const initBuild = (aggregateId: CustomerId): Cart =>
  build({ aggregateId, sequenceNumber: Aggregate.InitialSequenceNumber, props: { items: [] } });

export const addItem =
  (targetItem: Item) =>
  (cart: Cart): Result<[Cart, CartItemAdded], CartError | QuantityError> => {
    const { props } = cart;
    return Result.combine(
      props.items.map((item) =>
        ProductId.equals(item.productId, targetItem.productId)
          ? Item.add(targetItem.quantity)(item)
          : ok(item),
      ),
    )
      .andThen((items) =>
        safeBuild({ ...cart, sequenceNumber: cart.sequenceNumber + 1, props: { items } }),
      )
      .map((newCart) => {
        const event = pipe(
          newCart,
          DomainEvent.generate(CartItemAdded.name, aggregateName, { item: targetItem }),
        );
        return [newCart, event];
      });
  };

export const removeItem =
  (productId: ProductId) =>
  (cart: Cart): [Cart, CartItemRemoved] => {
    const { props } = cart;
    const items = props.items.filter((item) => item.productId !== productId);
    const newCart = build({ ...cart, sequenceNumber: cart.sequenceNumber + 1, props: { items } });
    const event = pipe(
      newCart,
      DomainEvent.generate(CartItemRemoved.name, aggregateName, { productId }),
    );
    return [newCart, event];
  };

export const updateItemQuantity =
  (productId: ProductId, quantity: Quantity) =>
  (cart: Cart): Result<[Cart, CartItemQuantityUpdated], CartError> => {
    const { props } = cart;
    const items = props.items.map((item) =>
      ProductId.equals(item.productId, productId)
        ? { productId, price: item.price, quantity }
        : item,
    );
    return safeBuild({ ...cart, sequenceNumber: cart.sequenceNumber + 1, props: { items } }).map(
      (newCart) => {
        const event = pipe(
          newCart,
          DomainEvent.generate(CartItemQuantityUpdated.name, aggregateName, {
            productId,
            quantity,
          }),
        );
        return [newCart, event];
      },
    );
  };

export const clear =
  (aggregateId: CustomerId) =>
  (cart: Cart): [Cart, CartCleared] => {
    const newCart = build({
      ...cart,
      aggregateId,
      sequenceNumber: cart.sequenceNumber + 1,
      props: { items: [] },
    });
    const event = pipe(newCart, DomainEvent.generate(CartCleared.name, aggregateName, undefined));
    return [newCart, event];
  };

export const Cart = {
  schema,
  initBuild,
  clear,
  addItem,
  removeItem,
  updateItemQuantity,
} as const;
