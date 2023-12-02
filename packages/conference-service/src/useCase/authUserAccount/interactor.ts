import type { UserAccountResolver } from '../../domain/userAccount';
import { UserAccountNotFoundError, UserAccount } from '../../domain/userAccount';
import { Failure } from '../../util/result';
import type { AuthUserAccountUseCase, Input, Output } from './useCase';

export class Interactor implements AuthUserAccountUseCase {
  constructor(private userAccountResolver: UserAccountResolver) {}

  async run({ email, password }: Input): Promise<Output> {
    const userAccount = await this.userAccountResolver.resolveByEmail(email);
    if (!userAccount) {
      return Failure(new UserAccountNotFoundError(email));
    }
    return UserAccount.auth(password)(userAccount);
  }
}
