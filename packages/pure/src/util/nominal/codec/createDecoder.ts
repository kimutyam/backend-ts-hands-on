import type { Decoder } from '#/util/codec/decoder.js';
import type { Nominal } from '#/util/nominal/nominal.js';

export const decodeNominal =
  <Name extends string>(name: Name) =>
  <T>(value: T): Nominal<Name, T> =>
    ({ ...value, __name: name, __uniqueSymbol: Symbol(name) }) as Nominal<Name, T>;

export const createDecoder = <Name extends string, S>(
  name: Name,
): Decoder<S, Nominal<Name, S>> => ({
  decode: (raw: S) => decodeNominal(name)(raw),
});
