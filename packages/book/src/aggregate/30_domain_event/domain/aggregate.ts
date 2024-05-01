import { z } from 'zod';

export interface Aggregate<AggregateID> {
  aggregateId: AggregateID;
  sequenceNumber: number;
}

const makeSchema = <
  AggregateId,
  Appendix,
  AggregateIdSchema extends z.ZodSchema<AggregateId, any, any>,
  AppendixSchema extends z.ZodSchema<Appendix, any, any>,
>(
  aggregateIdSchema: AggregateIdSchema,
  appendixSchema: AppendixSchema,
) =>
  z
    .intersection(
      z.object({
        aggregateId: aggregateIdSchema,
        sequenceNumber: z.number(),
      }),
      appendixSchema,
    )
    .readonly();

export const Aggregate = {
  makeSchema,
} as const;
