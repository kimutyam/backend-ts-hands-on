import type { MyError, SomeError } from 'ch3/ex3238/types.js';
import {
  calculate,
  subRouting1,
  subRouting2,
  toMyError,
} from 'ch3/ex3238/types.js';
import type { Result } from 'neverthrow';

const doSomething = (): Result<number, SomeError | MyError> =>
  subRouting1()
    .map((r1) =>
      subRouting2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomething };
