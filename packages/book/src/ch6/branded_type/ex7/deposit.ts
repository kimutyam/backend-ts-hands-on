import { AccountBalance } from 'ch6/branded_type/ex7/accountBalance.js';
import { CustomerId } from 'ch6/branded_type/ex7/customerId.js';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: AccountBalance(accountBalance * 2),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
