import type { Prism } from 'monocle-ts';
import type { AnyNewtype, CarrierOf } from 'newtype-ts';
import { prism } from 'newtype-ts';
import type { z, ZodType } from 'zod';
import type { Encoder } from '#/util/encoder.js';
import { encoderFromPrism } from '#/util/encoder.js';
import type { UnsafeDecoder } from '#/util/unsafeDecoder.js';
import { unsafeDecoderFromPrism } from '#/util/unsafeDecoder.js';

interface ZodCodec<S, A> extends Encoder<S, A>, UnsafeDecoder<S, A> {
  zodEffects: z.ZodType<A>;
}

const zodCodecFromNewType = <S extends AnyNewtype>(zodType: ZodType): ZodCodec<CarrierOf<S>, S> => {
  const prismInstance = prism<S>((raw) => zodType.safeParse(raw).success);
  const { encode } = encoderFromPrism(prismInstance);
  const { unsafeDecode } = unsafeDecoderFromPrism(prismInstance);
  return {
    encode,
    zodEffects: zodType.transform(unsafeDecode),
    unsafeDecode,
  };
};
const zodCodecFromPrism =
  <S, A>(prismInstance: Prism<S, A>) =>
  (zodType: ZodType<S>): ZodCodec<S, A> => {
    const { encode } = encoderFromPrism(prismInstance);
    const { unsafeDecode } = unsafeDecoderFromPrism(prismInstance);
    return {
      encode,
      zodEffects: zodType.transform(unsafeDecode),
      unsafeDecode,
    };
  };

export { type ZodCodec, zodCodecFromPrism, zodCodecFromNewType };
