import { toErrorMessage } from 'ch4/ex4/toErrorMessage.js';
import { toIntAsync } from 'ch4/ex6/toIntAsync.js';
import { ResultAsync } from 'neverthrow';

const toIntResultAsync: (s: string) => ResultAsync<number, string> =
  ResultAsync.fromThrowable(toIntAsync, toErrorMessage);

toIntResultAsync('Invalid');
