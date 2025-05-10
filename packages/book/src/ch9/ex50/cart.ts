import { Aggregate } from 'ch9/ex50/aggregate.js';
import type { CartClearReason } from 'ch9/ex50/cartClearReason.js';
import type { AddCartError } from 'ch9/ex50/cartError.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from 'ch9/ex50/cartEvent.js';
import { CartItem } from 'ch9/ex50/cartItem.js';
import { CustomerId } from 'ch9/ex50/customerId.js';
import { DomainEvent } from 'ch9/ex50/domainEvent.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { buildFromZod } from 'ch9/ex50/result.js';
import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

const name = 'Cart';

const schema = Aggregate.makeBrandedSchema(
  CustomerId.schema,
  z.object({
    cartItems: z.array(CartItem.schema).readonly(),
  }),
  name,
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
      kind: name,
      error: zodError,
    })),
  );

const init = (aggregateId: CustomerId): Cart =>
  parse({
    aggregateId,
    sequenceNumber: Aggregate.InitialSequenceNumber,
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
          DomainEvent.generate(name, CartItemAdded.eventName, {
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
          DomainEvent.generate(name, CartItemUpdated.eventName, {
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
      DomainEvent.generate(name, CartItemRemoved.eventName, { productId }),
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
      DomainEvent.generate(name, CartCleared.eventName, {
        aggregateId,
        reason,
      }),
    );
    return [aggregate, event];
  };

const Cart = {
  name,
  schema: schemaWithRefinements,
  init,
  parse,
  safeParse,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart, type CartZodError };
