import { toErrorMessage } from '4_neverthrow/4_wrap_fromThrowable/toErrorMessage.js';
import { toIntAsync } from '4_neverthrow/6_wrap_fromPromiseAsync/toIntAsync.js';
import { ResultAsync } from 'neverthrow';

const toIntResultAsync: (
  s: string,
) => ResultAsync<number, string> =
  ResultAsync.fromThrowable(toIntAsync, toErrorMessage);

toIntResultAsync('Invalid');
