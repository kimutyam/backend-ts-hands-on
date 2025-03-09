import type {
  MyError,
  SomeError,
} from '4_neverthrow/0_sample/types.js';
import {
  calculate,
  toMyError,
} from '4_neverthrow/0_sample/types.js';
import {
  subRoutingAsync1,
  subRoutingAsync2,
} from '4_neverthrow/0_sample/typesAsync.js';
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
