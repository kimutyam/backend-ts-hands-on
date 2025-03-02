import type { ResultAsync } from 'neverthrow';
import type { SomeError } from './types.js';

declare function subRoutingAsync1(): ResultAsync<
  number,
  SomeError
>;
declare function subRoutingAsync2(): ResultAsync<
  number,
  SomeError
>;

export { subRoutingAsync1, subRoutingAsync2 };
