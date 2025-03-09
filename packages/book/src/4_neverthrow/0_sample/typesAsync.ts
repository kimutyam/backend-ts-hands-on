import type { SomeError } from '4_neverthrow/0_sample/types.js';
import type { ResultAsync } from 'neverthrow';

declare function subRoutingAsync1(): ResultAsync<
  number,
  SomeError
>;
declare function subRoutingAsync2(): ResultAsync<
  number,
  SomeError
>;

export { subRoutingAsync1, subRoutingAsync2 };
