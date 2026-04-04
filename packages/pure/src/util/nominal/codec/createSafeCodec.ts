import type { SafeCodec } from '#/util/codec/createSafeCodec.js';
import { createCodec } from '#/util/nominal/codec/createCodec.js';
import { createSafeDecoder } from '#/util/nominal/codec/createSafeDecoder.js';
import type { Nominal } from '#/util/nominal/nominal.js';

export const createSafeCodec = <Name extends string, S, E>(
  name: Name,
  validate: (value: S) => boolean,
  toFailure: (value: S) => E,
): SafeCodec<S, Nominal<Name, S>, E> => {
  const { encode, decode } = createCodec<Name, S>(name);
  const { safeDecode } = createSafeDecoder(name, validate, toFailure);
  return { encode, decode, safeDecode };
};
