import type { IndivisibleBillError } from 'ch3/ex44/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex44/numberOfMembersError.js';

export type SplitBillError =
  | NumberOfMembersError
  | IndivisibleBillError;
