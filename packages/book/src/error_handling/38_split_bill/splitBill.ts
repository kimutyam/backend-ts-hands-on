import assert from 'node:assert';
import type { Result } from '../23_result/result.js';
import { Failure, Success } from '../23_result/result.js';
import { IndivisibleBillError } from '../27_error_adt/indivisibleBillError.js';
import type { SplitBillError } from '../27_error_adt/splitBillError.js';

// 勘定を他の関数でも使う場合に不変なオブジェクトの性質として。
class Bill {
  constructor(public value: number) {
    assert(value > 0);
  }
}

export function splitBill(bill: Bill, members: number): Result<number, SplitBillError> {
  assert(members >= 2, '2人以上を指定してください');
  const calculated = bill.value / members;
  if (!Number.isInteger(calculated)) {
    return Failure(new IndivisibleBillError('割り切れません', calculated));
  }
  return Success(calculated);
}
