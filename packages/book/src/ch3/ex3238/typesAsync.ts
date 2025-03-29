import type { SomeError } from 'ch3/ex3238/types.js';
import type { ResultAsync } from 'neverthrow';

declare function subRoutingAsync1(): ResultAsync<number, SomeError>;
declare function subRoutingAsync2(): ResultAsync<number, SomeError>;

export { subRoutingAsync1, subRoutingAsync2 };
