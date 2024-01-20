import { okAsync, ResultAsync } from 'neverthrow';

const ra1: Array<ResultAsync<number, never>> = [okAsync(1), okAsync(2)];

const ra2 = ResultAsync.combine(ra1);

console.log(ra2);
