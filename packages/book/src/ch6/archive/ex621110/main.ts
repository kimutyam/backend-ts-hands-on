import type { AccountBalance } from 'ch6/archive/ex621110/accountBalance.js';
import type { CustomerId } from 'ch6/archive/ex621110/customerId.js';

const chargeInterest = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: accountBalance * 1.1,
});

const customerId = 10;
const accountBalance: AccountBalance = 1_234_567;

// 1
chargeInterest(accountBalance, customerId);
