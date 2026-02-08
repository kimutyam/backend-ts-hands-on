import { ResultAsync } from 'neverthrow';

const unsafeWrapPromise = (value?: string): Promise<string> => {
  if (value === undefined) {
    throw new Error('user id is undefined');
  }
  return Promise.resolve(value);
};

// ResultAsync<string, { message: string }>
const ra = ResultAsync.fromPromise(unsafeWrapPromise(), () => ({
  message: 'rejected',
}));

console.log(ra);
