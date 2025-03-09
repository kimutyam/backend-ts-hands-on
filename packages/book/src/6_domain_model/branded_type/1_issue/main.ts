import type { AccountBalance } from '6_domain_model/branded_type/1_issue/accountBalance.js';
import type { CustomerId } from '6_domain_model/branded_type/1_issue/customerId.js';

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
