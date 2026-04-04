import type { Decoder } from '#/util/codec/decoder.js';
import type { Encoder } from '#/util/codec/encoder.js';

export interface Codec<S, A> extends Encoder<S, A>, Decoder<S, A> {}
