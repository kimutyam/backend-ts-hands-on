import { z } from 'zod';

export const productSchema = z.object({
  id: z.uuid('uuid形式にしてください'),
  price: z
    .number()
    .int('整数で指定ください')
    .min(1000, '1000円未満の商品を扱えません')
    .max(100_000, '10万円を超える商品を扱えません'),
});

export const sortedStringSchema = z
  .string()
  .refine(
    (arg) => Array.from(arg).sort().join('') === arg,
    'ソートされていません',
  );
