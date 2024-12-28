import { ResultAsync } from 'neverthrow';
import { toErrorMessage } from '../4_wrap_fromThrowable/toErrorMessage';
import { toIntAsync } from './toIntAsync';

const toIntResultAsync: (s: string) => ResultAsync<number, string> = ResultAsync.fromThrowable(
  toIntAsync,
  toErrorMessage,
);

toIntResultAsync('Invalid');
