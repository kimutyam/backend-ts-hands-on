import { Result } from 'neverthrow';
import { toErrorMessage } from './toErrorMessage.js';
import { toInt } from './toInt.js';

const toIntResult: (s: string) => Result<number, string> = Result.fromThrowable(
  toInt,
  toErrorMessage,
);

toIntResult('Invalid');
