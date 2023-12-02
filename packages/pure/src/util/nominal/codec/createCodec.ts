import type { Codec } from '../../codec/codec';
import type { Nominal } from '../nominal';
import { createDecoder } from './createDecoder';
import { createEncoder } from './createEncoder';

export const createCodec = <Name extends string, S>(name: Name): Codec<S, Nominal<Name, S>> => {
  const { encode } = createEncoder<Name, S>();
  const { decode } = createDecoder<Name, S>(name);
  return { encode, decode };
};
