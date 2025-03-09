import { toErrorMessage } from 'ch4/ex4/toErrorMessage.js';
import { toInt } from 'ch4/ex4/toInt.js';
import { Result } from 'neverthrow';

const toIntResult: (s: string) => Result<number, string> = Result.fromThrowable(
  toInt,
  toErrorMessage,
);

toIntResult('Invalid');
