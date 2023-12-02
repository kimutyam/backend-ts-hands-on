import type { ApplicationError } from '../util/applicationError';
import type { Nominal } from '../util/nominal';
import { safeDecodeNominalResult } from '../util/nominal';
import type { Result } from '../util/result';

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
  decode: (value: RawType): Result<UserAccountId, DecodeUserAccountIdError> =>
    safeDecodeNominalResult(UserAccountIdTypeName, value, validate, DecodeUserAccountIdError),
} as const;

export { UserAccountId };
