import type { Prism } from 'monocle-ts';
import type { Decoder } from './decoder';
import { decoderFromPrism } from './decoder';
import type { Encoder } from './encoder';
import { encoderFromPrism } from './encoder';
import type { UnsafeDecoder } from './unsafeDecoder';
import { unsafeDecoderFromPrism } from './unsafeDecoder';

interface Codec<S, A, L> extends Encoder<S, A>, Decoder<S, A, L>, UnsafeDecoder<S, A> {}

const codecFromPrism =
  <S, A>(prism: Prism<S, A>) =>
  <L>(errorContext: (ss: S) => L): Codec<S, A, L> => {
    const { encode } = encoderFromPrism(prism);
    const { decode } = decoderFromPrism(prism)(errorContext);
    const { unsafeDecode } = unsafeDecoderFromPrism(prism);
    return {
      encode,
      errorContext,
      decode,
      unsafeDecode,
    };
  };

export { type Codec, codecFromPrism };
