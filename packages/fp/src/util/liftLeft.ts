import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type * as NA from 'fp-ts/NonEmptyArray';

export const liftLeft =
  <L, A, S>(either: (s: S) => E.Either<L, A>): ((s: S) => E.Either<NA.NonEmptyArray<L>, A>) =>
  (s) =>
    pipe(
      s,
      either,
      E.mapLeft((ss) => [ss]),
    );
