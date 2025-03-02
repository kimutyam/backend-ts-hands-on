import { ResultAsync } from 'neverthrow';
import { toErrorMessage } from '../4_wrap_fromThrowable/toErrorMessage.js';
import { toIntAsync } from './toIntAsync.js';

const toIntResultAsync: (
  s: string,
) => ResultAsync<number, string> =
  ResultAsync.fromThrowable(toIntAsync, toErrorMessage);

toIntResultAsync('Invalid');
