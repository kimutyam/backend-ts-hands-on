interface Aggregate<AggregateId, AggregateName extends string> {
  readonly aggregateId: AggregateId;
  readonly aggregateName: AggregateName;
  readonly sequenceNumber: number;
}

const InitialSequenceNumber = 1;

const incrementSequenceNumber = (sequenceNumber: number): number => sequenceNumber + 1;

const Aggregate = {
  InitialSequenceNumber,
  incrementSequenceNumber,
} as const;

export { Aggregate };
