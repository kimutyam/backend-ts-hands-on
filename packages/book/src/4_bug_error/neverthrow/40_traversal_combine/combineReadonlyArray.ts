import { err, ok, Result } from 'neverthrow';

const r1: ReadonlyArray<Result<number, never>> = [ok(1), ok(2)];

// Ok([1,2])
const r2: Result<ReadonlyArray<number>, never> = Result.combine(r1);
// Ok(3)
const r3: Result<number, never> = r2.map((arr) => arr.reduce((acc, ele) => acc + ele, 0));

const r4: ReadonlyArray<Result<number, string>> = [ok(1), err('Ohh!'), ok(2)];
// Err("ohh")
const r5: Result<ReadonlyArray<number>, string> = Result.combine(r4);

console.log(r3, r5);
