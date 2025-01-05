import * as z from 'zod';

const zodType = z.number().int().min(1000).brand('Price');

export type Raw = z.input<typeof zodType>;
export type Price = z.infer<typeof zodType>;

const build = (a: Raw): Price => zodType.parse(a);

export const Price = {
  build,
} as const;
