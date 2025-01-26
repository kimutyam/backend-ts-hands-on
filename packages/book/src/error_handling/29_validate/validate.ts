import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { BillError } from '../26_add_error_but/billError.js';
import type { SplitBillError } from '../26_add_error_but/splitBillError.js';

export function validate(bill: number, members: number): ReadonlyArray<SplitBillError> {
  const issues: Array<SplitBillError> = [];

  if (bill <= 0) {
    issues.push(new BillError('勘定は0より大きくしてください', bill));
  }
  if (members < 2) {
    issues.push(new NumberOfMembersError('2人以上を指定してください', members));
  }
  return issues;
}
