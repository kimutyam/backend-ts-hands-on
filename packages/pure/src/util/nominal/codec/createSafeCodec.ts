import type { SafeCodec } from '../../codec/createSafeCodec';
import type { Nominal } from '../nominal';
import { createCodec } from './createCodec';
import { createSafeDecoder } from './createSafeDecoder';

export const createSafeCodec = <Name extends string, S, E>(
  name: Name,
  validate: (value: S) => boolean,
  toFailure: (value: S) => E,
): SafeCodec<S, Nominal<Name, S>, E> => {
  const { encode, decode } = createCodec<Name, S>(name);
  const { safeDecode } = createSafeDecoder(name, validate, toFailure);
  return { encode, decode, safeDecode };
};
