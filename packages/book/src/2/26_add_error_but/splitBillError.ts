import type { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import type { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import type { BillError } from './billError';

// 新しくBillErrorを追加する
export type SplitBillError = NumberOfMembersError | IndivisibleBillError | BillError;
