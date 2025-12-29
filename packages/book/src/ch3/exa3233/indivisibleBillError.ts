import type { ApplicationError } from '../ex3231/applicationError.js';

const kind = 'IndivisibleBill';

interface IndivisibleBillError extends ApplicationError<typeof kind> {
  readonly bill: number;
  readonly members: number;
  readonly calculated: number;
}

const create = (
  bill: number,
  members: number,
  calculated: number,
): IndivisibleBillError => ({
  kind,
  message: '割り切れません',
  bill,
  members,
  calculated,
});

const IndivisibleBillError = {
  kind,
  create,
} as const;

export { IndivisibleBillError };
