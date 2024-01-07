import assert from 'node:assert';
import { pipe } from 'remeda';
import type { Brand } from '../7_intersection/brand';
import { InvariantsError } from './invariantsError';
import type { Result } from './result';
import { Failure, Success } from './result';

declare const tag: unique symbol;
type RawType = number;
export type OrderQuantity = Brand<RawType, typeof tag>;

type AccountBalanceError = InvariantsError<RawType>;

const validate = (value: RawType): AccountBalanceError | undefined => {
  const issues: Array<string> = [];
  if (!Number.isInteger(value)) {
    issues.push('整数ではありません');
  }
  if (value < 1) {
    issues.push('1個以上にしてください');
  }
  if (value < 100) {
    issues.push('100以上を指定ください');
  }
  return issues.length === 0 ? new InvariantsError(issues, value) : undefined;
};

const build = (value: number): OrderQuantity => {
  let issues: AccountBalanceError | undefined;
  assert((issues = validate(value)) === undefined, issues?.message);
  return value as OrderQuantity;
};

const safeBuild = (value: number): Result<AccountBalanceError, OrderQuantity> =>
  pipe(validate(value), (invariantsError) =>
    invariantsError === undefined ? Success(value as OrderQuantity) : Failure(invariantsError),
  );

export const AccountBalance = {
  build,
  safeBuild,
} as const;
