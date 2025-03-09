import assert from 'node:assert';

import { ResultAsync } from 'neverthrow';

it('a', async () => {
  const aa: ResultAsync<number, never> = ResultAsync.fromSafePromise(
    Promise.resolve(42),
  );
  const a = await aa;
  assert(a.isOk());
  expect(a.value).toBe(42);
});
