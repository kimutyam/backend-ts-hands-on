import { AccountBalance } from 'ch6/branded_type/ex10/accountBalance.js';
import { CustomerId } from 'ch6/branded_type/ex10/customerId.js';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: number]: AccountBalance } => ({
  [customerId.value]: AccountBalance(accountBalance.value * 2),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
