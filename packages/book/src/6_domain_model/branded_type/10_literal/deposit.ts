import { AccountBalance } from './accountBalance';
import { CustomerId } from './customerId';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: number]: AccountBalance } => ({
  [customerId.value]: AccountBalance(accountBalance.value * 2),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
