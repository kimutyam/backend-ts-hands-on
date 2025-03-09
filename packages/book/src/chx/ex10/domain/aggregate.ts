import { z } from 'zod';

interface Aggregate<AggregateID, Props extends { [k: string]: unknown }> {
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
  z
    .object({
      aggregateId: aggregateIdSchema,
      props: propsSchema,
    })
    .readonly();

const Aggregate = {
  makeSchema,
} as const;

export { Aggregate };
