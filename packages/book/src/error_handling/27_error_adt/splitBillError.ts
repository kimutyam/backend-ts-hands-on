import type { BillError } from './billError';
import type { IndivisibleBillError } from './indivisibleBillError';
import type { NumberOfMembersError } from './numberOfMembersError';

export type SplitBillError = NumberOfMembersError | IndivisibleBillError | BillError;
