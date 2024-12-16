import type { IndivisibleBillError } from '../26_error_custom/indivisibleBillError';
import type { NumberOfMembersError } from '../26_error_custom/numberOfMembersError';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
