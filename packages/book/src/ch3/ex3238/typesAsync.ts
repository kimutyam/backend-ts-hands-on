import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from './types.js';

declare function subRoutingAsync1(): ResultAsync<number, SomethingError>;
declare function subRoutingAsync2(): ResultAsync<number, SomethingError>;

export { subRoutingAsync1, subRoutingAsync2 };
