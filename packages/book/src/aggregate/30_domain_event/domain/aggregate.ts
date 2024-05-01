import { z } from 'zod';

export interface Aggregate<AggregateID> {
  aggregateId: AggregateID;
  sequenceNumber: number;
}

const makeSchema = <
  AggregateId,
  Props,
  AggregateIdSchema extends z.ZodSchema<AggregateId, any, any>,
  PropsSchema extends z.ZodSchema<Props, any, any>,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsSchema: PropsSchema,
) =>
  z
    .object({
      aggregateId: aggregateIdSchema,
      sequenceNumber: z.number(),
      props: propsSchema,
    })
    .readonly();

export const Aggregate = {
  makeSchema,
} as const;
