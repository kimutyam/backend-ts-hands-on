import { ResultAsync } from 'neverthrow';

import { toErrorMessage } from '../ex4112/toErrorMessage.js';
import { toIntAsync } from './toIntAsync.js';

const toIntResultAsync: (s: string) => ResultAsync<number, string> =
  ResultAsync.fromThrowable(toIntAsync, toErrorMessage);

toIntResultAsync('Invalid');
