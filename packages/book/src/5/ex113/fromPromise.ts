import { ResultAsync } from 'neverthrow';

import { toErrorMessage } from '../ex112/toErrorMessage.js';
import { toIntAsync } from './toIntAsync.js';

// ResultAsync<number, string>
const ra = ResultAsync.fromPromise(toIntAsync('123'), toErrorMessage);

console.log(ra);
