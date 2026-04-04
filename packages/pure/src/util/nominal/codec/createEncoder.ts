import type { Encoder } from '#/util/codec/encoder.js';
import type { Nominal } from '#/util/nominal/nominal.js';

export const encodeNominal = <Name extends string, T>(nominal: Nominal<Name, T>): T => nominal;

export const createEncoder = <Name extends string, S>(): Encoder<S, Nominal<Name, S>> => ({
  encode: (a: Nominal<Name, S>) => encodeNominal<Name, S>(a),
});
