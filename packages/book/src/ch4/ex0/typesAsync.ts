import type { SomeError } from 'ch4/ex0/types.js';
import type { ResultAsync } from 'neverthrow';

declare function subRoutingAsync1(): ResultAsync<number, SomeError>;
declare function subRoutingAsync2(): ResultAsync<number, SomeError>;

export { subRoutingAsync1, subRoutingAsync2 };
