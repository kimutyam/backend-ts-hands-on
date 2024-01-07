import * as z from 'zod';

const zodType = z.number().int().min(1).max(10).brand('OrderQuantity');

type Input = z.input<typeof zodType>;
export type OrderQuantity = z.infer<typeof zodType>;

const build = (a: Input): OrderQuantity => zodType.parse(a);
const safeBuild = (a: Input): z.SafeParseReturnType<number, OrderQuantity> => zodType.safeParse(a);

export const OrderQuantity = {
  build,
  safeBuild,
  zodType,
} as const;
