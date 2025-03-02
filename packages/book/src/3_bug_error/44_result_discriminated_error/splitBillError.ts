import type { IndivisibleBillError } from './indivisibleBillError.js';
import type { NumberOfMembersError } from './numberOfMembersError.js';

export type SplitBillError =
  | NumberOfMembersError
  | IndivisibleBillError;
