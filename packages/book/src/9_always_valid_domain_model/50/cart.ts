import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { pipe } from 'remeda';
import { z } from 'zod';
import { Aggregate } from './aggregate.js';
import type { CartClearReason } from './cartClearReason.js';
import type { CartError } from './cartError.js';
import { CartCleared, CartItemAdded, CartItemRemoved, CartItemUpdated } from './cartEvent.js';
import { CartItem } from './cartItem.js';
import { CustomerId } from './customerId.js';
import { DomainEvent } from './domainEvent.js';
import { ProductId } from './productId.js';
import { buildFromZod } from './result.js';

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

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + CartItem.calculateTotal(item), 0);

const withinTotalPriceLimit = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

const schemaWithRefinements = schema
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

const build = (value: CartInput): Cart => schemaWithRefinements.parse(value);

const safeBuild = (value: CartInput): Result<Cart, CartError> =>
  R.pipe(
    schemaWithRefinements.safeParse(value),
    buildFromZod((zodError) => ({ kind: name, error: zodError })),
  );

const initBuild = (aggregateId: CustomerId): Cart =>
  build({
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
  }: Cart): Result<[Cart, CartItemAdded | CartItemUpdated], CartError> => {
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      // (1)
      return safeBuild({
        aggregateId,
        sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
        cartItems: [...cartItems, targetCartItem],
      }).map((aggregate) => {
        const event = pipe(
          aggregate,
          DomainEvent.generate(name, CartItemAdded.eventName, {
            cartItem: targetCartItem,
          }),
        );
        return [aggregate, event];
      });
    }

    // (2)
    const cartItemsResult = Result.combine(
      cartItems.map((cartItem) =>
        ProductId.equals(cartItem.productId, targetCartItem.productId)
          ? R.pipe(cartItem, CartItem.add(targetCartItem.quantity, targetCartItem.price))
          : R.pipe(cartItem, ok),
      ),
    );

    // (3)
    return cartItemsResult
      .andThen((updated) =>
        safeBuild({
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
  ({ aggregateId, sequenceNumber, cartItems }: Cart): [Cart, CartItemRemoved] => {
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    const aggregate = build({
      aggregateId,
      sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
      cartItems: removedCartItems,
    });
    const event = pipe(
      aggregate,
      DomainEvent.generate(name, CartItemRemoved.eventName, { productId }),
    );
    return [aggregate, event];
  };

const clear =
  (reason: CartClearReason) =>
  ({ aggregateId, sequenceNumber }: Cart): [Cart, CartCleared] => {
    const aggregate = build({
      aggregateId,
      sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
      cartItems: [],
    });
    const event = pipe(
      aggregate,
      DomainEvent.generate(name, CartCleared.eventName, { aggregateId, reason }),
    );
    return [aggregate, event];
  };

const Cart = {
  schema: schemaWithRefinements,
  name,
  initBuild,
  build,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart, type CartZodError };
