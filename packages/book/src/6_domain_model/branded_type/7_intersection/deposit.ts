import { AccountBalance } from '6_domain_model/branded_type/7_intersection/accountBalance.js';
import { CustomerId } from '6_domain_model/branded_type/7_intersection/customerId.js';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: CustomerId]: AccountBalance } => ({
  [customerId]: AccountBalance(accountBalance * 2),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
