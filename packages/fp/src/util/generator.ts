import { pipe } from 'fp-ts/function';
import type { AnyNewtype, CarrierOf } from 'newtype-ts';
import { iso } from 'newtype-ts';

interface Generator<S> {
  generate: () => S;
}

const generator = <S extends AnyNewtype>(generate: () => CarrierOf<S>): Generator<S> => ({
  generate: () => pipe(generate(), iso<S>().get),
});

export { type Generator, generator };
