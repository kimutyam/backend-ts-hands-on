const AccountBalance = Symbol.for('AccountBalance');

type AccountBalance = number & {
  readonly [AccountBalance]: unknown;
};

export type { AccountBalance };
