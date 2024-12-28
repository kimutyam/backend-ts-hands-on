import type { ResultAsync } from 'neverthrow';
import type { MyError, SomeError } from './types';
import { calculate, toMyError } from './types';
import { subRoutingAsync1, subRoutingAsync2 } from './typesAsync';

const doSomethingAsync = (): ResultAsync<number, SomeError | MyError> =>
  subRoutingAsync1()
    .map((r1) =>
      subRoutingAsync2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomethingAsync };
