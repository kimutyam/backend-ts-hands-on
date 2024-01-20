import type { ResultAsync } from 'neverthrow';
import { okAsync, errAsync } from 'neverthrow';

const okAsync1: ResultAsync<number, never> = okAsync(42);
const okAwaited1 = await okAsync1;
okAwaited1.isOk(); // true
okAwaited1.isErr(); // false

const errAsync1: ResultAsync<never, string> = errAsync('Error');
const errAwaited1 = await errAsync1;

errAwaited1.isOk(); // false
errAwaited1.isErr(); // true
