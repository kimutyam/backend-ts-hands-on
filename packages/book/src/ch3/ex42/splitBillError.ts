import type { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
