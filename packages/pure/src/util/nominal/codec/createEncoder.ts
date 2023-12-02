import type { Encoder } from '../../codec/encoder';
import type { Nominal } from '../nominal';

export const encodeNominal = <Name extends string, T>(nominal: Nominal<Name, T>): T => nominal;

export const createEncoder = <Name extends string, S>(): Encoder<S, Nominal<Name, S>> => ({
  encode: (a: Nominal<Name, S>) => encodeNominal<Name, S>(a),
});
