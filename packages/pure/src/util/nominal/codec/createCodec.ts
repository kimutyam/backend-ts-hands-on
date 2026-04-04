import type { Codec } from '#/util/codec/codec.js';
import { createDecoder } from '#/util/nominal/codec/createDecoder.js';
import { createEncoder } from '#/util/nominal/codec/createEncoder.js';
import type { Nominal } from '#/util/nominal/nominal.js';

export const createCodec = <Name extends string, S>(name: Name): Codec<S, Nominal<Name, S>> => {
  const { encode } = createEncoder<Name, S>();
  const { decode } = createDecoder<Name, S>(name);
  return { encode, decode };
};
