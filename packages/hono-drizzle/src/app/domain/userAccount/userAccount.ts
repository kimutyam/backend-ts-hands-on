import { z } from 'zod';

import { Aggregate } from '../aggregate.js';

const aggregateName = 'Order';

const schema = Aggregate.makeBrandedSchema(
  z.string(),
  z.object({
    name: z.string(),
  }),
  aggregateName,
);

type Input = z.input<typeof schema>;
type UserAccount = z.infer<typeof schema>;

const parse = (value: Input): UserAccount => schema.parse(value);

const UserAccount = {
  aggregateName,
  parse,
} as const;

export type { UserAccount };
