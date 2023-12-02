import type { Result } from '../result';

export interface SafeDecoder<S, A, E> {
  safeDecode: (raw: S) => Result<E, A>;
}
