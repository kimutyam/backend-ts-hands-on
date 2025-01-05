const AccountBalance = Symbol('AccountBalance');

type AccountBalance = number & { readonly [AccountBalance]: unknown };

export type { AccountBalance };
