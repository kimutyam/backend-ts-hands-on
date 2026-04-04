import type { SafeDecoder } from '#/util/codec/safeDecoder.js';
import { decodeNominal } from '#/util/nominal/codec/createDecoder.js';
import type { Nominal } from '#/util/nominal/nominal.js';
import type { Result } from '#/util/result.js';
import { Failure, Success } from '#/util/result.js';

export const safeDecodeNominal =
  <Name extends string, S, E>(
    name: Name,
    validate: (value: S) => boolean,
    toFailure: (value: S) => E,
  ) =>
  (value: S): Result<E, Nominal<Name, S>> =>
    validate(value) ? Success(decodeNominal(name)(value)) : Failure(toFailure(value));

export const createSafeDecoder = <Name extends string, S, E>(
  name: Name,
  validate: (value: S) => boolean,
  toFailure: (value: S) => E,
): SafeDecoder<S, Nominal<Name, S>, E> => ({
  safeDecode: (raw: S) => safeDecodeNominal(name, validate, toFailure)(raw),
});
