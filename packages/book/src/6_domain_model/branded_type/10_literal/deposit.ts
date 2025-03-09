import { AccountBalance } from '6_domain_model/branded_type/10_literal/accountBalance.js';
import { CustomerId } from '6_domain_model/branded_type/10_literal/customerId.js';

export const deposit = (
  customerId: CustomerId,
  accountBalance: AccountBalance,
): { [key: number]: AccountBalance } => ({
  [customerId.value]: AccountBalance(
    accountBalance.value * 2,
  ),
});

const customerId = CustomerId(10);
const accountBalance = AccountBalance(1_234_567);

deposit(customerId, accountBalance);
