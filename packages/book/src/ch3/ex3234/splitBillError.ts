import type { IndivisibleBillError } from 'ch3/ex3234/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex3234/numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
