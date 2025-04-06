import { ResultAsync } from 'neverthrow';

const ra = ResultAsync.fromSafePromise(Promise.resolve(42));

const a = await ra;
console.log(a);
