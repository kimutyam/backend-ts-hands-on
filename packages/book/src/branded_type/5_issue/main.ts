type CustomerId = number;

type AccountBalance = number;
const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: accountBalance * 2,
});

const customerId = 10;
const accountBalance: AccountBalance = 1_234_567;

// works..
deposit(accountBalance, customerId);
