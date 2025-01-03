import { Result } from 'neverthrow';
import { toErrorMessage } from './toErrorMessage';
import { toInt } from './toInt';

const toIntResult: (s: string) => Result<number, string> = Result.fromThrowable(
  toInt,
  toErrorMessage,
);

toIntResult('Invalid');
