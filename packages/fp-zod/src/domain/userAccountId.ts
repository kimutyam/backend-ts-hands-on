import { randomUUID } from 'crypto';
import type { Newtype } from 'newtype-ts';
import { prism } from 'newtype-ts';
import { validate as uuidValidate } from 'uuid';
import { encoderFromPrism } from '../util/encoder';
import { generator } from '../util/generator';

type RawType = string;

type UserAccountId = Newtype<{ readonly USER_ACCOUNT_ID: unique symbol }, RawType>;

const prismInstance = prism<UserAccountId>((id) => uuidValidate(id));

const { encode } = encoderFromPrism(prismInstance);
const { generate } = generator<UserAccountId>(randomUUID);

const UserAccountId = {
  encode,
  generate,
} as const;

export { UserAccountId };
