import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { SlatChange } from 'zod_blog/1000_refinement/slotChange.js';
import { fromZodReturnTypeDefault } from 'zod_blog/700_refinement/resultBuilder.js';

const schema = z.number().int().min(1).max(1_000);

export type ParticipationSlot = z.infer<typeof schema>;

export type ParticipationSlotInput = z.input<typeof schema>;

const build = (
  input: ParticipationSlotInput,
): ParticipationSlot => schema.parse(input);

const safeBuild = (
  a: ParticipationSlotInput,
): Result<
  ParticipationSlot,
  z.ZodError<ParticipationSlotInput>
> => fromZodReturnTypeDefault(schema.safeParse(a));

const increase =
  (change: SlatChange) =>
  (
    p: ParticipationSlot,
  ): Result<
    ParticipationSlot,
    z.ZodError<ParticipationSlotInput>
  > =>
    safeBuild(p + change);

export const OrderQuantity = {
  build,
  safeBuild,
  schema,
  increase,
} as const;
