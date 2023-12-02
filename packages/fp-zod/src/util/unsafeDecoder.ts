import assert from 'assert';
import * as O from 'fp-ts/Option';

interface UnsafeDecoder<S, A> {
  unsafeDecode: (raw: S) => A;
}

const unsafeDecoderFromPrism = <S, A>(prism: {
  getOption: (s: S) => O.Option<A>;
}): UnsafeDecoder<S, A> => ({
  unsafeDecode: (s: S): A => {
    const opt = prism.getOption(s);
    assert(O.isSome(opt), `${s} is an invariant violation.`);
    return opt.value;
  },
});

export { type UnsafeDecoder, unsafeDecoderFromPrism };
