import type { Newtype } from 'newtype-ts';
import { z } from 'zod';
import type { ZodCodec } from '../util/zodCodec';
import { zodCodecFromNewType } from '../util/zodCodec';

type RawType = number;

type Age = Newtype<{ readonly AGE: unique symbol }, RawType>;

const errorMessage = `未成年は登録できません`;

const zodType = z.number().min(18, errorMessage).describe(`年齢`);

const zodCodec: ZodCodec<RawType, Age> = zodCodecFromNewType<Age>(zodType);

const Age = {
  ...zodCodec,
} as const;

export { Age };
