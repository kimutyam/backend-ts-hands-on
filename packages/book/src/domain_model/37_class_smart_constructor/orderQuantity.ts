import assert from 'node:assert';
import { OrderQuantityError } from '../31_fp_smart_constructor/orderQuantityError';
import type { Result } from '../31_fp_smart_constructor/result';
import { Failure, Success } from '../31_fp_smart_constructor/result';

const validate = (value: number): Array<string> => {
  const issues: Array<string> = [];
  if (Number.isInteger(value)) {
    issues.push('整数で指定ください');
  }
  if (value >= 1) {
    issues.push('1個以上にしてください');
  }
  if (value <= 10) {
    issues.push('1つの注文に含められるのは10個までです');
  }
  return issues;
};

export class OrderQuantity {
  private constructor(public value: number) {}

  static safeBuild(value: number): Result<OrderQuantityError, OrderQuantity> {
    const issues = validate(value);
    return issues.length
      ? Failure(OrderQuantityError.build(issues))
      : Success(new OrderQuantity(value));
  }

  static build(value: number): OrderQuantity {
    let issues: Array<string>;
    assert((issues = validate(value)).length === 0, issues.join('\n'));
    return new OrderQuantity(value);
  }
}
