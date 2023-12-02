import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type * as O from 'fp-ts/Option';

interface Decoder<S, A, L> {
  errorContext: (s: S) => L;
  decode: (s: S) => E.Either<L, A>;
}

const decoderFromPrism =
  <S, A>(prism: { getOption: (s: S) => O.Option<A> }) =>
  <L>(errorContext: (ss: S) => L): Decoder<S, A, L> => ({
    errorContext,
    decode: (s: S): E.Either<L, A> =>
      pipe(
        prism.getOption(s),
        E.fromOption(() => errorContext(s)),
      ),
  });

export { type Decoder, decoderFromPrism };
