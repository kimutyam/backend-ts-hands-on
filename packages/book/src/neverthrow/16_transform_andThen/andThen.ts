import type { Result, ResultAsync } from 'neverthrow';
import { ok, err } from 'neverthrow';

const f1 = (n: number): Result<number, Error> => ok(n * 2);
const f2 = (n: number): Result<string, Error> => ok(n.toString());
const f3 = (s: string): Result<string, string> => (s === 'NaN' ? err('Ohh!') : ok(s));

const r1: Result<number, Error> = ok(10).andThen(f1);

const r2: Result<string, Error> = ok(10).andThen(f1).andThen(f2);

const r3: Result<string, string | Error> = ok(10).andThen(f1).andThen(f2).andThen(f3);

declare const fa1: (n: number) => ResultAsync<number, Error>;
declare const fa2: (n: number) => ResultAsync<string, Error>;
declare const fa3: (n: string) => ResultAsync<string, string>;

const ra1: ResultAsync<string, string | Error> = ok(10).asyncAndThen(fa1).andThen(fa2).andThen(fa3);

console.log(r1, r2, r3, ra1);
