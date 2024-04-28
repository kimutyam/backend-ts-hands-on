import { EventStoreDBClient, jsonEvent, FORWARDS, START } from '@eventstore/db-client';

const client = new EventStoreDBClient({
  endpoint: 'localhost:2113',
});

export async function simpleTest() {
  const streamName = 'es_supported_clients';

  const jEvent = jsonEvent({
    type: 'grpc-client',
    data: {
      languages: ['typescript', 'javascript'],
      runtime: 'NodeJS',
    },
  });

  const appendResult = await client.appendToStream(streamName, [jEvent]);
  // eslint-disable-next-line
  console.log(appendResult);

  const events = client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  // eslint-disable-next-line no-restricted-syntax
  for await (const event of events) {
    // eslint-disable-next-line
    console.log(event);
  }
}
