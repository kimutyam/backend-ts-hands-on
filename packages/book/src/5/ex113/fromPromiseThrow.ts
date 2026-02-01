import { ResultAsync } from 'neverthrow';

const unsafeWrapPromise = (value?: string): Promise<string> => {
  if (value === undefined) {
    throw new Error('user id is undefined');
  }
  return Promise.resolve(value);
};

// 1
const r = ResultAsync.fromPromise(unsafeWrapPromise(), () => ({
  message: 'rejected',
}));

console.log(r);
