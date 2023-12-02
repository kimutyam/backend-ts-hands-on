import type { Newtype } from 'newtype-ts';
import { z } from 'zod';
import type { ZodCodec } from '../util/zodCodec';
import { zodCodecFromNewType } from '../util/zodCodec';

type RawType = string;

type UserAccountName = Newtype<{ readonly USER_ACCOUNT_NAME: unique symbol }, RawType>;

const MinLength = 4;
const MaxLength = 12;

const lengthErrorMessage = `ユーザーアカウント名は${MinLength}文字以上${MaxLength}文字以内で指定してください`;

const zodType = z
  .string()
  .min(MinLength, lengthErrorMessage)
  .max(MaxLength, lengthErrorMessage)
  .regex(/^[A-Za-z0-9]+$/, '半角英数字で指定ください')
  .describe(`ユーザーアカウント名`);

const zodCodec: ZodCodec<RawType, UserAccountName> = zodCodecFromNewType<UserAccountName>(zodType);

const UserAccountName = {
  ...zodCodec,
} as const;

export { UserAccountName };
