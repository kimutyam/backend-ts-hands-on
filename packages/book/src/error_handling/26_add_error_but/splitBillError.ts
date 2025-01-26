import type { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import type { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';
import type { BillError } from './billError.js';

// 新しくBillErrorを追加する
export type SplitBillError = NumberOfMembersError | IndivisibleBillError | BillError;
