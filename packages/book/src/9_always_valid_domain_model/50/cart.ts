import { ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { pipe } from 'remeda';
import { z } from 'zod';
import type { QuantityError } from '../../aggregate/10_zod/domain/item/quantity.js';
import { Aggregate } from './aggregate.js';
import type { CartClearReason } from './cartClearReason.js';
import { CartCleared, CartItemAdded, CartItemRemoved, CartItemUpdated } from './cartEvent.js';
import { CartItem } from './cartItem.js';
import { CustomerId } from './customerId.js';
import { DomainEvent } from './domainEvent.js';
import { ProductId } from './productId.js';
import { buildFromZodDefault } from './result.js';

const aggregateName = 'Cart' as const;

const schema = Aggregate.makeBrandedSchema(
  CustomerId.schema,
  z.object({
    cartItems: z.array(CartItem.schema).readonly(),
  }),
  aggregateName,
);

type Cart = z.infer<typeof schema>;
type Input = z.input<typeof schema>;
type CartError = z.ZodError<Input>;

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

const build = (value: Input): Cart => schemaWithRefinements.parse(value);

const safeBuild = (value: Input): Result<Cart, CartError> =>
  R.pipe(schemaWithRefinements.safeParse(value), buildFromZodDefault);

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
  }: Cart): Result<[Cart, CartItemAdded | CartItemUpdated], CartError | QuantityError> => {
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      return safeBuild({
        aggregateId,
        sequenceNumber: Aggregate.incrementSequenceNumber(sequenceNumber),
        cartItems: [...cartItems, targetCartItem],
      }).map((aggregate) => {
        const event = pipe(
          aggregate,
          DomainEvent.generate(aggregateName, CartItemAdded.eventName, {
            cartItem: targetCartItem,
          }),
        );
        return [aggregate, event];
      });
    }

    return Result.combine(
      cartItems.map((cartItem) =>
        ProductId.equals(cartItem.productId, targetCartItem.productId)
          ? R.pipe(cartItem, CartItem.add(targetCartItem.quantity, targetCartItem.price))
          : R.pipe(cartItem, ok),
      ),
    )
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
          DomainEvent.generate(aggregateName, CartItemUpdated.eventName, {
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
      DomainEvent.generate(aggregateName, CartItemRemoved.eventName, { productId }),
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
      DomainEvent.generate(aggregateName, CartCleared.eventName, { aggregateId, reason }),
    );
    return [aggregate, event];
  };

const Cart = {
  aggregateName,
  initBuild,
  build,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart };
