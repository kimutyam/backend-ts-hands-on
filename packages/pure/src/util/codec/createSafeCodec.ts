import type { Decoder } from './decoder';
import type { Encoder } from './encoder';
import type { SafeDecoder } from './safeDecoder';

export interface SafeCodec<S, A, E> extends Encoder<S, A>, Decoder<S, A>, SafeDecoder<S, A, E> {}
