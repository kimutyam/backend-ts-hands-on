import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type * as NA from 'fp-ts/NonEmptyArray';
import type { UserAccountDecodeError } from './domain/userAccount';
import { UserAccount } from './domain/userAccount';

type Args = Readonly<{
  name: string;
  age: number;
}>;
const createUserAccount = (
  name: string,
  age: number,
): E.Either<NA.NonEmptyArray<UserAccountDecodeError>, UserAccount> =>
  pipe(UserAccount.decode(name, age), E.map(UserAccount.create));

// anyの場合はどうする？
function main({ name, age }: Args): void {
  const userAccount = createUserAccount(name, age);
  if (E.isRight(userAccount)) {
    /* eslint-disable-next-line no-console */
    console.log(userAccount.right.id);
  } else {
    /* eslint-disable-next-line no-console */
    console.error(userAccount.left.map((e) => e.message));
  }
}

main({ name: 'kimutyam', age: 10 });
