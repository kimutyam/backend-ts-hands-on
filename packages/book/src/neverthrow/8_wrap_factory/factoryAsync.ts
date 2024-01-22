import { ResultAsync } from 'neverthrow';
import { toErrorMessage } from './toErrorMessage';
import { toIntAsync } from './toIntAsync';

const ra1: ResultAsync<number, string> = ResultAsync.fromPromise(
  toIntAsync('Invalid'),
  toErrorMessage,
);

const ra2: ResultAsync<number, never> = ResultAsync.fromSafePromise(Promise.resolve(42));

console.log(ra1, ra2);
