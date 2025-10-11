import type { SomethingError } from 'ch3/ex3238/types.js';
import type { ResultAsync } from 'neverthrow';

declare function subRoutingAsync1(): ResultAsync<number, SomethingError>;
declare function subRoutingAsync2(): ResultAsync<number, SomethingError>;

export { subRoutingAsync1, subRoutingAsync2 };
