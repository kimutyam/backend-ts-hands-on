import { Aggregate } from 'ch9/ex50/aggregate.js';
import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import type { CartClearReason } from 'ch9/ex50/cartClearReason.js';
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
import type { QuantityRefinementsError } from 'ch9/ex50/quantity.js';
import { buildFromZod } from 'ch9/ex50/result.js';
import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

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

const errorKind = 'CartRefinementsError';

interface CartRefinementsError extends ApplicationError<typeof errorKind> {
  error: CartZodError;
}

const createError = (error: CartZodError): CartRefinementsError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const CartRefinementsError = {
  kind: errorKind,
  create: createError,
} as const;

const ItemsLimit = 10;
const TotalQuantityLimit = 30;
const TotalPriceLimit = 100_000;

const countItems = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.length;
};

const withinItemsLimit = (cart: Cart): boolean =>
  countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
};

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.reduce(
    (acc, item) => acc + CartItem.calculateTotal(item),
    0,
  );
};

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

const safeParse = (value: CartInput): Result<Cart, CartRefinementsError> =>
  R.pipe(schemaWithRefinements.safeParse(value), buildFromZod(createError));

const init = (aggregateId: CustomerId): Cart =>
  parse({
    aggregateId,
    sequenceNumber: Aggregate.InitialSequenceNumber,
    cartItems: [],
  });

const addCartItem =
  (targetCartItem: CartItem) =>
  (
    cart: Cart,
    // 1
  ): Result<
    [Cart, CartItemAdded | CartItemUpdated],
    QuantityRefinementsError | CartRefinementsError
  > => {
    const { aggregateId, sequenceNumber, cartItems } = cart;
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
  (cart: Cart): [Cart, CartItemRemoved] => {
    const { aggregateId, sequenceNumber, cartItems } = cart;
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
  (cart: Cart): [Cart, CartCleared] => {
    const { aggregateId, sequenceNumber } = cart;
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
