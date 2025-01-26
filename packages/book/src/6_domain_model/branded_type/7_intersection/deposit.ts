import { AccountBalance } from './accountBalance.js';
import { CustomerId } from './customerId.js';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: AccountBalance(accountBalance * 2),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
