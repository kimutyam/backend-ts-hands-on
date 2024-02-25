import { z } from 'zod';
import type { SafeParseReturnType } from 'zod/lib/types';

const schema = z.number().int().min(1);

export type ParticipationSlot = z.infer<typeof schema>;

export type ParticipationSlotInput = z.input<typeof schema>;

const build = (input: ParticipationSlotInput): ParticipationSlot => schema.parse(input);
const safeBuild = (
  input: ParticipationSlotInput,
): SafeParseReturnType<ParticipationSlotInput, ParticipationSlot> => schema.safeParse(input);

export const OrderQuantity = {
  build,
  safeBuild,
  schema,
} as const;
