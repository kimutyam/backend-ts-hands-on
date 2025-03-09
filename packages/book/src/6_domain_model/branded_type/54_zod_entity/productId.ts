import type { Eq } from '6_domain_model/branded_type/54_zod_entity/eq.js';
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
