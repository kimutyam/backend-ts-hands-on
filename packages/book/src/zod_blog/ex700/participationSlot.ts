import type { Result } from 'neverthrow';
import { z } from 'zod';

import { fromZodReturnTypeDefault } from './resultBuilder.js';

const schema = z.number().int().min(1);

export type ParticipationSlot = z.infer<typeof schema>;

export type ParticipationSlotInput = z.input<typeof schema>;

const build = (input: ParticipationSlotInput): ParticipationSlot =>
  schema.parse(input);

const safeBuild = (
  a: ParticipationSlotInput,
): Result<ParticipationSlot, z.ZodError<ParticipationSlotInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

export const OrderQuantity = {
  build,
  safeBuild,
  schema,
} as const;
