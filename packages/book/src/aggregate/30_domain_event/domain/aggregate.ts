import { z } from 'zod';

export interface Aggregate<AggregateID> {
  aggregateId: AggregateID;
  sequenceNumber: number;
}

const schema = <
  AggregateId,
  Appendix,
  AggregateIdSchema extends z.ZodSchema<AggregateId, any, any>,
  AppendixSchema extends z.ZodSchema<Appendix, any, any>,
>(
  aggregateIdSchema: AggregateIdSchema,
  appendixSchema: AppendixSchema,
) =>
  z.intersection(
    z.object({
      aggregateId: aggregateIdSchema,
      sequenceNumber: z.number(),
    }),
    appendixSchema,
  );

export const Aggregate = {
  schema,
};
