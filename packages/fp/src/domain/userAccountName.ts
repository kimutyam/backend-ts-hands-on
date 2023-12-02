import type { Newtype } from 'newtype-ts';
import { prism } from 'newtype-ts';
import type { ApplicationError } from '../util/applicationError';
import { codecFromPrism } from '../util/codec';

type RawType = string;

type UserAccountName = Newtype<{ readonly USER_ACCOUNT_NAME: unique symbol }, RawType>;

const MinLength = 4;
const MaxLength = 12;

// 複数条件の時にバリデーションエラーのメッセージングに弱い。
const errorMessage = `ユーザーアカウント名は${MinLength}文字以上${MaxLength}文字以内で半角英数字で指定してください`;

const prismInstance = prism<UserAccountName>(
  (raw) => raw.length >= MinLength && raw.length <= MaxLength && /^[A-Za-z0-9]+$/.test(raw),
);

type UserAccountNameDecodeError = ApplicationError<
  'UserAccountNameDecodeError',
  Readonly<{
    name: RawType;
  }>
>;

const UserAccountNameDecodeError = {
  new: (raw: RawType): UserAccountNameDecodeError => ({
    kind: 'UserAccountNameDecodeError',
    message: errorMessage,
    detail: { name: raw },
  }),
} as const;

const UserAccountName = {
  ...codecFromPrism(prismInstance)(UserAccountNameDecodeError.new),
} as const;

export { UserAccountName, UserAccountNameDecodeError };
