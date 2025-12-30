interface Aggregate<AggregateId> {
  readonly aggregateId: AggregateId;
  readonly sequenceNumber: number;
}

const InitialSequenceNumber = 1;

const incrementSequenceNumber = (sequenceNumber: number): number =>
  sequenceNumber + 1;

const Aggregate = {
  InitialSequenceNumber,
  incrementSequenceNumber,
} as const;

export { Aggregate };
