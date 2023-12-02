import type { Prism } from 'monocle-ts';
import type { AnyNewtype, CarrierOf } from 'newtype-ts';
import { prism } from 'newtype-ts';
import type { z, ZodType } from 'zod';
import type { Encoder } from './encoder';
import { encoderFromPrism } from './encoder';
import type { UnsafeDecoder } from './unsafeDecoder';
import { unsafeDecoderFromPrism } from './unsafeDecoder';

interface ZodCodec<S, A> extends Encoder<S, A>, UnsafeDecoder<S, A> {
  zodEffects: z.ZodEffects<z.ZodTypeAny, A, S>;
}

const zodCodecFromNewType = <S extends AnyNewtype>(
  zodType: ZodType<CarrierOf<S>>,
): ZodCodec<CarrierOf<S>, S> => {
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
