import { z } from 'zod';

interface Aggregate<AggregateId, AggregateName extends string> {
  readonly aggregateId: AggregateId;
  readonly aggregateName: AggregateName;
  readonly sequenceNumber: number;
}

const InitialSequenceNumber = 1;

const incrementSequenceNumber = (sequenceNumber: number): number => sequenceNumber + 1;

const makeSchema = <
  AggregateName extends string,
  AggregateIdSchema extends z.ZodType,
  PropsSchema extends z.ZodObject<z.ZodRawShape>,
>(
  aggregateIdSchema: AggregateIdSchema,
  aggregateName: AggregateName,
  propsSchema: PropsSchema,
) =>
  z
    .object({
      aggregateId: aggregateIdSchema,
      aggregateName: z.literal(aggregateName),
      sequenceNumber: z.number().int().min(InitialSequenceNumber),
    })
    .merge(propsSchema)
    .readonly()
    .brand(aggregateName);

const Aggregate = {
  InitialSequenceNumber,
  incrementSequenceNumber,
  makeSchema,
} as const;

export { Aggregate };
