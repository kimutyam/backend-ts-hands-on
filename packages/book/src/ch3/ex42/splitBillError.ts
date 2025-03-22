import type { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
