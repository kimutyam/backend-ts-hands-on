import type { DomainEvent } from '../../../domainEvent/domainEvent';
import type { Nominal } from '../../../nominal';
import { Builder } from '../builder';

describe('ドメインイベント', () => {
  const name = 'DummyEvent';
  type NominalDomainEvent = Nominal<
    typeof name,
    DomainEvent<typeof name, string, { aggregateName: string }>
  >;
  const aggregateType = 'Dummy';
  const builder = Builder<NominalDomainEvent>(name, aggregateType);

  it('イベントタイプは公証型の名前と一致する', () => {
    const event = builder.build('dummyAggregateId', { aggregateName: 'dummyName' });
    const { aggregateId, attribute, eventType } = event.value;
    expect(aggregateId).toBe('dummyAggregateId');
    expect(attribute).toStrictEqual({
      aggregateName: 'dummyName',
    });
    expect(eventType).toBe(name);
  });
});
