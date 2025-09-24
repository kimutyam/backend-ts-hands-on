import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { buildFromZod } from '../../util/result.js';
import { Aggregate } from '../aggregate.js';
import { CustomerId } from '../customer/customerId.js';
import { DomainEvent } from '../domainEvent.js';
import { ProductId } from '../product/productId.js';
import type { CartClearReason } from './cartClearReason.js';
import type { AddCartError } from './cartError.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from './cartEvent.js';
import { CartItem } from './cartItem.js';

const aggregateName = 'Cart';

const schema = Aggregate.makeBrandedSchema(
  CustomerId.schema,
  z.object({
    cartItems: z.array(CartItem.schema).readonly(),
  }),
  aggregateName,
);

type Cart = z.infer<typeof schema>;
type CartInput = z.input<typeof schema>;
type CartZodError = z.ZodError<CartInput>;

const ItemsLimit = 10;
const TotalQuantityLimit = 30;
const TotalPriceLimit = 100_000;

const countItems = ({ cartItems }: Cart): number => cartItems.length;

const withinItemsLimit = (cart: Cart): boolean =>
  countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + CartItem.calculateTotal(item), 0);

const withinTotalPriceLimit = (cart: Cart): boolean =>
  calculateTotalPrice(cart) <= TotalPriceLimit;

const schemaWithRefinements = schema
  .refine(
    (cart) => withinItemsLimit(cart),
    () => ({
      message: `カート項目数が ${ItemsLimit.toString()} を上回っています`,
    }),
  )
  .refine(
    (cart) => withinTotalQuantityLimit(cart),
    () => ({
      message: `総数が ${TotalQuantityLimit.toString()} を上回っています`,
    }),
  )
  .refine(
    (cart) => withinTotalPriceLimit(cart),
    () => ({
      message: `総額が ${TotalPriceLimit.toString()} を上回っています`,
    }),
  );

const parse = (value: CartInput): Cart => schemaWithRefinements.parse(value);

const safeParse = (value: CartInput): Result<Cart, AddCartError> =>
  R.pipe(
    schemaWithRefinements.safeParse(value),
    buildFromZod((zodError) => ({
      kind: aggregateName,
      error: zodError,
    })),
  );

const init = (
  aggregateId: CustomerId,
  sequenceNumber: number = Aggregate.InitialSequenceNumber,
): Cart =>
  parse({
    aggregateId,
    sequenceNumber,
    cartItems: [],
  });

const addCartItem =
  (targetCartItem: CartItem) =>
  ({
    aggregateId,
    sequenceNumber,
    cartItems,
    // 1
  }: Cart): Result<[Cart, CartItemAdded | CartItemUpdated], AddCartError> => {
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      // 2
      return safeParse({
        aggregateId,
        sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
        cartItems: [...cartItems, targetCartItem],
      }).map((aggregate) => {
        const event = R.pipe(
          aggregate,
          DomainEvent.generate(aggregateName, CartItemAdded.eventName, {
            cartItem: targetCartItem,
          }),
        );
        return [aggregate, event];
      });
    }

    // 3
    const cartItemsResult = Result.combine(
      cartItems.map((cartItem) =>
        ProductId.equals(cartItem.productId, targetCartItem.productId)
          ? R.pipe(
              cartItem,
              CartItem.add(targetCartItem.quantity, targetCartItem.price),
            )
          : ok(cartItem),
      ),
    );

    // 4
    return cartItemsResult
      .andThen((updated) =>
        safeParse({
          aggregateId,
          sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
          cartItems: updated,
        }),
      )
      .map((aggregate) => {
        const event = R.pipe(
          aggregate,
          DomainEvent.generate(aggregateName, CartItemUpdated.eventName, {
            cartItem: aggregate.cartItems[updateTargetIndex]!,
          }),
        );
        return [aggregate, event];
      });
  };

const removeCartItem =
  (productId: ProductId) =>
  ({
    aggregateId,
    sequenceNumber,
    cartItems,
  }: Cart): [Cart, CartItemRemoved] => {
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    const aggregate = parse({
      aggregateId,
      sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
      cartItems: removedCartItems,
    });
    const event = R.pipe(
      aggregate,
      DomainEvent.generate(aggregateName, CartItemRemoved.eventName, {
        productId,
      }),
    );
    return [aggregate, event];
  };

const clear =
  (reason: CartClearReason) =>
  ({ aggregateId, sequenceNumber }: Cart): [Cart, CartCleared] => {
    const aggregate = parse({
      aggregateId,
      sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
      cartItems: [],
    });
    const event = R.pipe(
      aggregate,
      DomainEvent.generate(aggregateName, CartCleared.eventName, {
        aggregateId,
        reason,
      }),
    );
    return [aggregate, event];
  };

const Cart = {
  aggregateName,
  schema: schemaWithRefinements,
  init,
  parse,
  safeParse,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart, type CartZodError };
