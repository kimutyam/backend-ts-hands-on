import { ulid } from 'ulidx';
import * as z from 'zod';
import type { Eq } from '../../../../branded_type/54_zod_entity/eq';

export declare const CustomerIdBrand: unique symbol;

const schema = z.string().ulid().brand(CustomerIdBrand);
const generate = () => schema.parse(ulid());

type Input = z.input<typeof schema>;
export type CustomerId = z.infer<typeof schema>;

const equals: Eq<CustomerId> = (x: CustomerId, y: CustomerId): boolean => x === y;

const build = (a: Input): CustomerId => schema.parse(a);

export const CustomerId = {
  schema,
  build,
  generate,
  equals,
} as const;
