import type { Prism } from 'monocle-ts';
import type { Decoder } from '#/util/decoder.js';
import { decoderFromPrism } from '#/util/decoder.js';
import type { Encoder } from '#/util/encoder.js';
import { encoderFromPrism } from '#/util/encoder.js';
import type { UnsafeDecoder } from '#/util/unsafeDecoder.js';
import { unsafeDecoderFromPrism } from '#/util/unsafeDecoder.js';

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
