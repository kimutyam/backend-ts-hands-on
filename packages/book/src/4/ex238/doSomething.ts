import type { Result } from 'neverthrow';

import type { MyError, SomethingError } from './types.js';
import { calculate, subRouting1, subRouting2, toMyError } from './types.js';

const doSomething = (): Result<number, SomethingError | MyError> =>
  subRouting1()
    .map((r1) =>
      subRouting2()
        .map((r2) => calculate(r1, r2))
        .mapErr(toMyError),
    )
    .andThen((a) => a);

export { doSomething };
