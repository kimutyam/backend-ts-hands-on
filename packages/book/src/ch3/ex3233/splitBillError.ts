import type { IndivisibleBillError } from 'ch3/ex3233/indivisibleBillError.js';
import type { NumberOfMembersError } from 'ch3/ex3233/numberOfMembersError.js';

type SplitBillError = NumberOfMembersError | IndivisibleBillError;

export type { SplitBillError };
