import type { Decoder } from '../../codec/decoder';
import type { Nominal } from '../nominal';

export const decodeNominal =
  <Name extends string>(name: Name) =>
  <T>(value: T): Nominal<Name, T> =>
    ({ ...value, __name: name, __uniqueSymbol: Symbol(name) }) as Nominal<Name, T>;

export const createDecoder = <Name extends string, S>(
  name: Name,
): Decoder<S, Nominal<Name, S>> => ({
  decode: (raw: S) => decodeNominal(name)(raw),
});
