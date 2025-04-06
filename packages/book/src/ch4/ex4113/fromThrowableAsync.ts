import { toErrorMessage } from 'ch4/ex4112/toErrorMessage.js';
import { toIntAsync } from 'ch4/ex4113/toIntAsync.js';
import { ResultAsync } from 'neverthrow';

const toIntResultAsync: (s: string) => ResultAsync<number, string> =
  ResultAsync.fromThrowable(toIntAsync, toErrorMessage);

toIntResultAsync('Invalid');
