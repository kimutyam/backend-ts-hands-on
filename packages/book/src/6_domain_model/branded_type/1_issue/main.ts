import type { AccountBalance } from './accountBalance';
import type { CustomerId } from './customerId';

const chargeInterest = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: accountBalance * 1.1,
});

const customerId = 10;
const accountBalance: AccountBalance = 1_234_567;

// 指定誤りがあるが、コンパイルエラーにならない
chargeInterest(accountBalance, customerId);
