import assert from 'node:assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { OrderQuantityError } from '../31_fp_smart_constructor/orderQuantityError';

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

  static safeBuild(value: number): Result<OrderQuantity, OrderQuantityError> {
    const issues = validate(value);
    return issues.length ? err(OrderQuantityError.build(issues)) : ok(new OrderQuantity(value));
  }

  static build(value: number): OrderQuantity {
    let issues: Array<string>;
    assert((issues = validate(value)).length === 0, issues.join('\n'));
    return new OrderQuantity(value);
  }
}
