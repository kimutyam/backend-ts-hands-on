import type { AccountBalance } from 'ch6/branded_type/ex1/accountBalance.js';
import type { CustomerId } from 'ch6/branded_type/ex1/customerId.js';

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
