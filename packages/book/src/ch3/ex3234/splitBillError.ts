import type { IndivisibleBillError } from 'ch3/ex3234/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex3234/numberOfMembersError.js';

export type SplitBillError = NumberOfMembersError | IndivisibleBillError;
