import type { Decoder } from '#/util/codec/decoder.js';
import type { Encoder } from '#/util/codec/encoder.js';
import type { SafeDecoder } from '#/util/codec/safeDecoder.js';

export interface SafeCodec<S, A, E> extends Encoder<S, A>, Decoder<S, A>, SafeDecoder<S, A, E> {}
