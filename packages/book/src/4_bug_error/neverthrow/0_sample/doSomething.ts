import type { Result } from 'neverthrow';
import type { MyError, SomeError } from './types';
import { calculate, subRouting1, subRouting2, toMyError } from './types';

const doSomething = (): Result<number, SomeError | MyError> =>
  subRouting1()
    .map((r1) =>
      subRouting2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomething };
