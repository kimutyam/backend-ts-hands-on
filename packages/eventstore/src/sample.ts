import type { JSONEventType } from '@eventstore/db-client';
import { EventStoreDBClient, jsonEvent, FORWARDS, START, STREAM_NAME } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString`esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000`;

type TestEvent = JSONEventType<
  'TestEvent',
  {
    entityId: string;
    importantData: string;
  }
>;

export const persistEvent = async () => {
  const event = jsonEvent<TestEvent>({
    type: 'TestEvent',
    data: {
      entityId: 'aaaa',
      importantData: 'I wrote my first event!',
    },
  });

  await client.appendToStream(STREAM_NAME, event);
};

// persistEvent();

export const read = async () => {
  const events = client.readStream<TestEvent>(STREAM_NAME, {
    direction: FORWARDS,
    fromRevision: START,
    maxCount: 10,
  });

  // eslint-disable-next-line no-restricted-syntax
  for await (const event of events) {
    // eslint-disable-next-line
    console.log(event);
  }
};
