import type { Decoder } from './decoder';
import type { Encoder } from './encoder';

export interface Codec<S, A> extends Encoder<S, A>, Decoder<S, A> {}
