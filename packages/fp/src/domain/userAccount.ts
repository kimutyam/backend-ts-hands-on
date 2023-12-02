import * as AP from 'fp-ts/Apply';
import * as E from 'fp-ts/Either';
import * as NA from 'fp-ts/NonEmptyArray';
import { liftLeft } from '../util/liftLeft';
import type { AgeDecodeError } from './age';
import { Age } from './age';
import { UserAccountId } from './userAccountId';
import type { UserAccountNameDecodeError } from './userAccountName';
import { UserAccountName } from './userAccountName';

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
