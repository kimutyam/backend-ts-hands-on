import assert from 'node:assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { QuantityError } from '../31_fp_smart_constructor/quantityError';

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

export class Quantity {
  private constructor(public value: number) {}

  static safeBuild(value: number): Result<Quantity, QuantityError> {
    const issues = validate(value);
    return issues.length ? err(QuantityError.build(issues)) : ok(new Quantity(value));
  }

  static build(value: number): Quantity {
    let issues: Array<string>;
    assert((issues = validate(value)).length === 0, issues.join('\n'));
    return new Quantity(value);
  }
}
