import type { Eq } from 'ch6/branded_type/ex54/eq.js';
import { monotonicFactory } from 'ulidx';
import * as z from 'zod';

const zodType = z.string().ulid().brand('ProductId');
const generate = () => zodType.parse(monotonicFactory());

type Input = z.input<typeof zodType>;
export type ProductId = z.infer<typeof zodType>;

const equals: Eq<ProductId> = (
  x: ProductId,
  y: ProductId,
): boolean => x === y;

const build = (a: Input): ProductId => zodType.parse(a);

export const ProductId = {
  build,
  generate,
  equals,
} as const;
