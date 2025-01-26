import type { ResultAsync } from 'neverthrow';
import type { MyError, SomeError } from './types.js';
import { calculate, toMyError } from './types.js';
import { subRoutingAsync1, subRoutingAsync2 } from './typesAsync.js';

const doSomethingAsync = (): ResultAsync<number, SomeError | MyError> =>
  subRoutingAsync1()
    .map((r1) =>
      subRoutingAsync2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomethingAsync };
