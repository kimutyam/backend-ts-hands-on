import * as AP from 'fp-ts/Apply';
import * as E from 'fp-ts/Either';
import * as NA from 'fp-ts/NonEmptyArray';
import type { AgeDecodeError } from '#/domain/age.js';
import { Age } from '#/domain/age.js';
import { UserAccountId } from '#/domain/userAccountId.js';
import type { UserAccountNameDecodeError } from '#/domain/userAccountName.js';
import { UserAccountName } from '#/domain/userAccountName.js';
import { liftLeft } from '#/util/liftLeft.js';

type UserAccountDecodeError = UserAccountNameDecodeError | AgeDecodeError;

type UserAccount = Readonly<{
  id: UserAccountId;
  name: UserAccountName;
  age: Age;
}>;

const UserAccount = {
  decode: (
    rawUserAccountName: string,
    rawAge: number,
  ): E.Either<NA.NonEmptyArray<UserAccountDecodeError>, Omit<UserAccount, 'id'>> =>
    AP.sequenceS(E.getApplicativeValidation(NA.getSemigroup<UserAccountDecodeError>()))({
      name: liftLeft(UserAccountName.decode)(rawUserAccountName),
      age: liftLeft(Age.decode)(rawAge),
    }),

  create: ({ name, age }: Omit<UserAccount, 'id'>): UserAccount => ({
    id: UserAccountId.generate(),
    name,
    age,
  }),
} as const;

export { UserAccount, type UserAccountDecodeError };
