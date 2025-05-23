import { z } from 'zod';

export declare const OrderQuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(OrderQuantityBrand);

export type OrderQuantity = z.infer<typeof schema>;

export type OrderQuantityInput = z.input<typeof schema>;

const build = (input: OrderQuantityInput): OrderQuantity => schema.parse(input);

const safeBuild = (
  input: OrderQuantityInput,
): z.SafeParseReturnType<OrderQuantityInput, OrderQuantity> =>
  schema.safeParse(input);

export const OrderQuantity = {
  build,
  safeBuild,
  schema,
} as const;
