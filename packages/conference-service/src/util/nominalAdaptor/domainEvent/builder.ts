import { DomainEvent } from '../../domainEvent';
import { Builder as NominalBuilder } from '../../nominal';
import type { Nominal, NominalName, NominalValue } from '../../nominal';
import type { NNominal } from '../../nominal/nominal';

export type AnyNominalDomainEvent = Nominal<string, DomainEvent<any, unknown, any>>;
type NominalAggregateId<N extends AnyNominalDomainEvent> = NominalValue<N>['aggregateId'];
type NominalAttribute<N extends AnyNominalDomainEvent> = NominalValue<N>['attribute'];

export interface Builder<N extends AnyNominalDomainEvent> {
  build(aggregateId: NominalAggregateId<N>, attribute?: NominalAttribute<N>): NNominal<N>;
}

export const Builder = <N extends AnyNominalDomainEvent>(
  eventType: NominalName<N>,
  aggregateType: string,
): Builder<N> => ({
  build: (aggregateId: NominalAggregateId<N>, attribute?: NominalAttribute<N>): NNominal<N> => {
    const nominalBuilder = NominalBuilder<N>(eventType);
    const event = attribute
      ? DomainEvent.buildFn(eventType, aggregateType)(aggregateId, attribute)
      : DomainEvent.buildFn(eventType, aggregateType)(aggregateId);
    return nominalBuilder.build(event);
  },
});
