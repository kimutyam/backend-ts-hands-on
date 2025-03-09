import type { IndivisibleBillError } from '3_bug_error/44_result_discriminated_error/indivisibleBillError.js';
import type { NumberOfMembersError } from '3_bug_error/44_result_discriminated_error/numberOfMembersError.js';

export type SplitBillError =
  | NumberOfMembersError
  | IndivisibleBillError;
