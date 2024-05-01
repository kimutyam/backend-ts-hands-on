import { ulid } from 'ulidx';
import * as z from 'zod';
import type { Eq } from '../../util/eq';

export declare const ProductIdBrand: unique symbol;

const schema = z.string().ulid().brand(ProductIdBrand);
const generate = () => schema.parse(ulid());

type Input = z.input<typeof schema>;
export type ProductId = z.infer<typeof schema>;

const equals: Eq<ProductId> = (x: ProductId, y: ProductId): boolean => x === y;

const build = (a: Input): ProductId => schema.parse(a);

export const ProductId = {
  schema,
  build,
  generate,
  equals,
} as const;
