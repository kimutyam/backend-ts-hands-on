import { z } from 'zod';

interface Aggregate<AggregateId> {
  readonly aggregateId: AggregateId;
  readonly sequenceNumber: number;
}

const InitialSequenceNumber = 1;

const incrementSequenceNumber = (sequenceNumber: number): number =>
  sequenceNumber + 1;

const makeSchema = <
  AggregateIdSchema extends z.ZodType,
  PropsShape extends z.ZodRawShape,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsShape: PropsShape,
) =>
  z
    .object({
      aggregateId: aggregateIdSchema,
      sequenceNumber: z.number().int().min(InitialSequenceNumber),
    })
    .extend(propsShape)
    .readonly();

const makeBrandedSchema = <
  AggregateIdSchema extends z.ZodType,
  PropsShape extends z.ZodRawShape,
  BrandName extends string,
>(
  aggregateIdSchema: AggregateIdSchema,
  propsShape: PropsShape,
  brandName: BrandName,
) => makeSchema(aggregateIdSchema, propsShape).brand(brandName);

const Aggregate = {
  InitialSequenceNumber,
  incrementSequenceNumber,
  makeSchema,
  makeBrandedSchema,
} as const;

export { Aggregate };
