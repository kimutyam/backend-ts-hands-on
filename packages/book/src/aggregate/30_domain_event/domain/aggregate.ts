import { z } from 'zod';

const sequenceNumberSchema = z.number();
type SequenceNumber = z.infer<typeof sequenceNumberSchema>;

export interface Aggregate<AggregateID, Props extends { [k: string]: any }> {
  readonly aggregateId: AggregateID;
  readonly sequenceNumber: SequenceNumber;
  readonly props: Props;
}

const InitialSequenceNumber = 0;

const makeSchema = <
  AggregateId,
  Props extends { [k: string]: any },
  AggregateIdSchema extends z.ZodType<AggregateId, any, any>,
  PropsSchema extends z.ZodType<Props, any, any>,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsSchema: PropsSchema,
) =>
  z.object({
    aggregateId: aggregateIdSchema,
    sequenceNumber: sequenceNumberSchema,
    props: propsSchema,
  });

export const Aggregate = {
  makeSchema,
  InitialSequenceNumber,
} as const;
