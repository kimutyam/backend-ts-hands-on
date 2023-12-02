import type { Result } from './result';
import { Failure, Success } from './result';

type UniqueSymbol<Name extends string> = {
  readonly __name: Name;
  readonly __uniqueSymbol: unique symbol;
};

type Nominal<Name extends string, T> = UniqueSymbol<Name> & T;

const encodeNominal = <Name extends string, T>(nominal: Nominal<Name, T>): T => nominal;

const decodeNominal = <Name extends string, T>(name: Name, value: T): Nominal<Name, T> =>
  ({ ...value, __name: name, __uniqueSymbol: Symbol(name) }) as Nominal<Name, T>;

const safeDecodeNominal = <Name extends string, T>(
  name: Name,
  value: T,
  validate: (value: T) => boolean,
): Nominal<Name, T> | undefined => (validate(value) ? decodeNominal(name, value) : undefined);

const safeDecodeNominalResult = <Name extends string, T, E>(
  name: Name,
  value: T,
  validate: (value: T) => boolean,
  toFailure: (value: T) => E,
): Result<Nominal<Name, T>, E> =>
  validate(value) ? Success(decodeNominal(name, value)) : Failure(toFailure(value));

export { type Nominal, encodeNominal, decodeNominal, safeDecodeNominal, safeDecodeNominalResult };
