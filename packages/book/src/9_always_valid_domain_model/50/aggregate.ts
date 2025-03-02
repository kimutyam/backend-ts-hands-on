import { z } from 'zod';

interface Aggregate<AggregateId> {
  readonly aggregateId: AggregateId;
  readonly sequenceNumber: number;
}

const InitialSequenceNumber = 1;

const incrementSequenceNumber = (
  sequenceNumber: number,
): number => sequenceNumber + 1;

const makeSchema = <
  AggregateIdSchema extends z.ZodType,
  PropsSchema extends z.ZodObject<z.ZodRawShape>,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsSchema: PropsSchema,
) =>
  z
    .object({
      aggregateId: aggregateIdSchema,
      sequenceNumber: z
        .number()
        .int()
        .min(InitialSequenceNumber),
    })
    .merge(propsSchema)
    .readonly();

const makeBrandedSchema = <
  AggregateIdSchema extends z.ZodType,
  PropsSchema extends z.ZodObject<z.ZodRawShape>,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsSchema: PropsSchema,
  brandName: string,
) =>
  makeSchema(aggregateIdSchema, propsSchema).brand(
    brandName,
  );

const Aggregate = {
  InitialSequenceNumber,
  incrementSequenceNumber,
  makeSchema,
  makeBrandedSchema,
} as const;

export { Aggregate };
