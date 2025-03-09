import { ResultAsync } from 'neverthrow';

ResultAsync.fromSafePromise(Promise.resolve(42));
