import type { SafeDecoder } from '../../codec/safeDecoder';
import type { Result } from '../../result';
import { Failure, Success } from '../../result';
import type { Nominal } from '../nominal';
import { decodeNominal } from './createDecoder';

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
