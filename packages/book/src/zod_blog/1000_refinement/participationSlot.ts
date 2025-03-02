import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnTypeDefault } from '../700_refinement/resultBuilder.js';
import type { SlatChange } from './slotChange.js';

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
