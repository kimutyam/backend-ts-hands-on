import { errAsync, okAsync } from 'neverthrow';

// 1
const okAsync1 = okAsync({ data: 'success' });
const okAwaited1 = await okAsync1;
okAwaited1.isOk(); // true
okAwaited1.isErr(); // false

// 2
const errAsync1 = errAsync(42);
const errAwaited1 = await errAsync1;

errAwaited1.isOk(); // false
errAwaited1.isErr(); // true
