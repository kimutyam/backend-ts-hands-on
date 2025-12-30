import type { Result } from 'neverthrow';

declare const r: Result<Array<number>, Array<string>>;

const r1: Result<number, string> = r
  .map((a) => a.reduce((acc, cur) => acc + cur, 0))
  .mapErr((a) => a.join(' '));

r1.match(
  (t) => {
    console.log(`Sum is ${t.toString()}`);
  },
  (e) => {
    console.error(e);
  },
);
