import { err, ok, Result } from 'neverthrow';

const r1: Array<Result<number, string>> = [ok(1), err('oh'), ok(2), err('my'), err('god')];

const r2: Result<Array<number>, Array<string>> = Result.combineWithAllErrors(r1);

const r3: Result<number, string> = r2
  .map((okList) => okList.reduce((acc, ele) => acc + ele, 0))
  .mapErr((errList) => errList.join(' '));

r3.match(
  (t) => console.log(`Sum is ${t}`),
  (e) => console.error(e),
);
