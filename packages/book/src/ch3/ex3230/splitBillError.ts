import type { IndivisibleBillError } from 'ch3/ex3230/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex3230/numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
