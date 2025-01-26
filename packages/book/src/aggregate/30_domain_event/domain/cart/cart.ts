import { ok, Result } from 'neverthrow';
import { pipe } from 'remeda';
import { z } from 'zod';
import { CustomerId } from '../../../10_zod/domain/customer/customerId.js';
import { Item } from '../../../10_zod/domain/item/item.js';
import type { Quantity, QuantityError } from '../../../10_zod/domain/item/quantity.js';
import { ProductId } from '../../../10_zod/domain/product/productId.js';
import { buildFromZodDefault } from '../../../10_zod/util/result.js';
import { Aggregate } from '../aggregate.js';
import { DomainEvent } from '../domainEvent.js';
import {
  CartClearedOnOrder,
  CartItemAdded,
  CartItemQuantityUpdated,
  CartItemRemoved,
} from './cartEvent.js';

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

const addItem =
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

const removeItem =
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

const updateItemQuantity =
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

const clearOnOrder = (cart: Cart): [Cart, CartClearedOnOrder] => {
  const newCart = build({
    ...cart,
    sequenceNumber: cart.sequenceNumber + 1,
    props: { items: [] },
  });
  const event = pipe(
    newCart,
    DomainEvent.generate(CartClearedOnOrder.name, aggregateName, undefined),
  );
  return [newCart, event];
};

export const Cart = {
  schema,
  initBuild,
  clearOnOrder,
  addItem,
  removeItem,
  updateItemQuantity,
} as const;
