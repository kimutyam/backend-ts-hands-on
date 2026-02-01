import { ResultAsync } from 'neverthrow';

declare function selectUserCount(id: string): Promise<number>;

// ResultAsync<number, never>
const ra = ResultAsync.fromSafePromise(selectUserCount('user-id-1'));

console.log(ra);
