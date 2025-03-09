import type { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import type { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';

type SplitBillError =
  | NumberOfMembersError
  | IndivisibleBillError;

export type { SplitBillError };
