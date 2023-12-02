import type { ApplicationError } from '../util/applicationError';
import { createSafeCodec } from '../util/nominal/codec/createSafeCodec';
import type { Nominal } from '../util/nominal/nominal';

type RawType = string;
const UserAccountIdTypeName = 'UserAccountId';
type UserAccountIdType = typeof UserAccountIdTypeName;
type UserAccountId = Nominal<UserAccountIdType, RawType>;
const validate = (value: RawType): boolean => value.length > 0;

type DecodeUserAccountIdError = ApplicationError<
  'DecodeUserAccountIdError',
  Readonly<{ value: RawType }>
>;
const DecodeUserAccountIdError = (value: RawType): DecodeUserAccountIdError => ({
  kind: 'DecodeUserAccountIdError',
  message: 'Invalid UserId',
  detail: { value },
});

const UserAccountId = {
  ...createSafeCodec<UserAccountIdType, UserAccountId, DecodeUserAccountIdError>(
    UserAccountIdTypeName,
    validate,
    DecodeUserAccountIdError,
  ),
} as const;

export { UserAccountId };
