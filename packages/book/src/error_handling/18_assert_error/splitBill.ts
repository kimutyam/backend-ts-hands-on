import assert from 'node:assert';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';

export function splitBill(bill: number, members: number): number {
  assert(bill > 0, '勘定は0円以上にしてください');
  assert(members >= 2, '2人以上を指定してください');
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new IndivisibleBillError('割り切れません', calculated);
  }
  assert(calculated > 0, '割った結果が0より大きい');
  return calculated;
}
