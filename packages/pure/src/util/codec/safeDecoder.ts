import type { Result } from '#/util/result.js';

export interface SafeDecoder<S, A, E> {
  safeDecode: (raw: S) => Result<E, A>;
}
