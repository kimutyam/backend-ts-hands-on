import assert from 'node:assert';
import { pipe } from 'remeda';
import type { Brand } from '../7_intersection/brand.js';
import { InvariantsError } from './invariantsError.js';
import type { Result } from './result.js';
import { Failure, Success } from './result.js';

type RawType = number;
export type Quantity = Brand<RawType, 'Quantity'>;

type QuantityError = InvariantsError<RawType>;

const validate = (
  value: RawType,
): QuantityError | undefined => {
  const issues: Array<string> = [];
  if (!Number.isInteger(value)) {
    issues.push('整数ではありません');
  }
  if (value < 1) {
    issues.push('1個以上にしてください');
  }
  if (value > 10) {
    issues.push('10個までしか含められません');
  }
  return issues.length === 0
    ? new InvariantsError(issues, value)
    : undefined;
};

const build = (value: number): Quantity => {
  let issues: QuantityError | undefined;
  assert(
    (issues = validate(value)) === undefined,
    issues?.message,
  );
  return value as Quantity;
};

const safeBuild = (
  value: number,
): Result<QuantityError, Quantity> =>
  pipe(validate(value), (invariantsError) =>
    invariantsError === undefined
      ? Success(value as Quantity)
      : Failure(invariantsError),
  );

export const Quantity = {
  build,
  safeBuild,
} as const;
