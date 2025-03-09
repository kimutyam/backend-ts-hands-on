import type { MyError, SomeError } from 'ch4/ex0/types.js';
import { calculate, toMyError } from 'ch4/ex0/types.js';
import {
  subRoutingAsync1,
  subRoutingAsync2,
} from 'ch4/ex0/typesAsync.js';
import type { ResultAsync } from 'neverthrow';

const doSomethingAsync = (): ResultAsync<
  number,
  SomeError | MyError
> =>
  subRoutingAsync1()
    .map((r1) =>
      subRoutingAsync2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomethingAsync };
