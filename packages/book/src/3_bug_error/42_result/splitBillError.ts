import type { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import type { NumberOfMembersError } from '../26_error_custom/numberOfMembersError.js';

type SplitBillError =
  | NumberOfMembersError
  | IndivisibleBillError;

export type { SplitBillError };
