interface Repository<in AggregateId, Aggregate> {
  findById: (aggregateId: AggregateId) => Promise<Aggregate>;
  save: (aggregate: Aggregate) => Promise<void>;
  deleteById: (aggregateId: AggregateId) => Promise<void>;
}

export type { Repository };
