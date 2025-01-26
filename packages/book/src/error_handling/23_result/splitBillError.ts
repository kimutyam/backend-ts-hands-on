import type { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import type { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';

export type SplitBillError = NumberOfMembersError | IndivisibleBillError;
