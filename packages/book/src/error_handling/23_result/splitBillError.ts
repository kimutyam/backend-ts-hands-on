import type { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import type { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';

export type SplitBillError = NumberOfMembersError | IndivisibleBillError;
