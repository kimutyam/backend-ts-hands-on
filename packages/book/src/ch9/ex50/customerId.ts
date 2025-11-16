import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.ulid().brand('CustomerId');
type Input = z.input<typeof schema>;
type CustomerId = z.infer<typeof schema>;

const equals = (a: CustomerId, b: CustomerId): boolean => a === b;

const valueOf = (value: Input): CustomerId => schema.parse(value);

const generate = (): CustomerId => valueOf(ulid());

const CustomerId = {
  schema,
  valueOf,
  equals,
  generate,
} as const;

export { CustomerId };
