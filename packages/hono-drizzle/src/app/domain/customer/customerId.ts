import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.ulid().brand('CustomerId').meta({
  example: '01KAN6MY2AJFPVGQATAS6CK9XX',
  description: '顧客ID (ULID)',
});
type Input = z.input<typeof schema>;
type CustomerId = z.infer<typeof schema>;

const equals = (a: CustomerId, b: CustomerId): boolean => a === b;

const valueOf = (value: Input): CustomerId => schema.parse(value);

const generate = (): CustomerId => valueOf(ulid());

const CustomerId = {
  schema,
  build: valueOf,
  equals,
  generate,
} as const;

export { CustomerId };
