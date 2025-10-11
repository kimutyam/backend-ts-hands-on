import type { MyError, SomethingError } from 'ch3/ex3238/types.js';
import { calculate, toMyError } from 'ch3/ex3238/types.js';
import { subRoutingAsync1, subRoutingAsync2 } from 'ch3/ex3238/typesAsync.js';
import type { ResultAsync } from 'neverthrow';

const doSomethingAsync = (): ResultAsync<number, SomethingError | MyError> =>
  subRoutingAsync1()
    .map((r1) =>
      subRoutingAsync2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomethingAsync };
