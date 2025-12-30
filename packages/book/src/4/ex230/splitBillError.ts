import type { IndivisibleBillError } from './indivisibleBillError.js';
import type { NumberOfMembersError } from './numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
