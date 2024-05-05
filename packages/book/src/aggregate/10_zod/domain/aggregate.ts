import { z } from 'zod';

export interface Aggregate<AggregateID, Props extends { [k: string]: unknown }> {
  readonly aggregateId: AggregateID;
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
    props: propsSchema,
  });

export const Aggregate = {
  makeSchema,
} as const;
