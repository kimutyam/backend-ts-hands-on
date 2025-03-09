import { z } from 'zod';

const sequenceNumberSchema = z.number();
type SequenceNumber = z.infer<typeof sequenceNumberSchema>;

interface Aggregate<AggregateID, Props extends { [k: string]: unknown }> {
  readonly aggregateId: AggregateID;
  readonly sequenceNumber: SequenceNumber;
  readonly props: Props;
}

const makeSchema = <
  AggregateId,
  Props extends { [k: string]: unknown },
  AggregateIdSchema extends z.ZodType<AggregateId>,
  PropsSchema extends z.ZodType<Props>,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsSchema: PropsSchema,
) =>
  z.object({
    aggregateId: aggregateIdSchema,
    sequenceNumber: sequenceNumberSchema,
    props: propsSchema,
  });

const InitialSequenceNumber = 0;

const Aggregate = {
  makeSchema,
  InitialSequenceNumber,
} as const;

export { Aggregate };
