import { ok, Result } from 'neverthrow';

const r1: [Result<number, never>, Result<string, never>] = [ok(1), ok('Two')];

const r2: Result<[number, string], never> = Result.combine(r1);

console.log(r2);
