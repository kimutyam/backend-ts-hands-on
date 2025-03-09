import { toErrorMessage } from '4_neverthrow/4_wrap_fromThrowable/toErrorMessage.js';
import { toInt } from '4_neverthrow/4_wrap_fromThrowable/toInt.js';
import { Result } from 'neverthrow';

const toIntResult: (s: string) => Result<number, string> =
  Result.fromThrowable(toInt, toErrorMessage);

toIntResult('Invalid');
