import assert from 'node:assert';

import { ResultAsync } from 'neverthrow';

it('fromSafePromise on async error', async () => {
  const error = new Error('why');
  const ra = ResultAsync.fromSafePromise(Promise.reject(error));

  await expect(ra).rejects.toEqual(error);
});

it('fromPromise on async error', async () => {
  const error = new Error('why');
  const ra = ResultAsync.fromPromise(Promise.reject(error), () => ({
    message: 'rejected',
  }));
  const r = await ra;
  assert(r.isErr());
  expect(r.error.message).toBe('rejected');
  console.log(r);
});

const wrap = (str: string): Promise<string> => {
  if (str === '') {
    // this throws synchronously!
    throw new TypeError('missing user id');
  }
  return Promise.resolve(str);
};

it('fromSafePromise on sync error', async () => {
  const ra = ResultAsync.fromSafePromise(wrap('eh'));

  const a = await ra;
  console.log(a);
});
