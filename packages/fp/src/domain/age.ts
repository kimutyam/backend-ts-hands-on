import type { Newtype } from 'newtype-ts';
import { prism } from 'newtype-ts';
import type { ApplicationError } from '../util/applicationError';
import { codecFromPrism } from '../util/codec';

type RawType = number;

type Age = Newtype<{ readonly AGE: unique symbol }, RawType>;
const errorMessage = '未成年は登録できません';

const prismInstance = prism<Age>((raw: RawType) => raw >= 18);

type AgeDecodeError = ApplicationError<
  'AgeDecodeError',
  Readonly<{
    age: RawType;
  }>
>;

const AgeDecodeError = {
  new: (raw: RawType): AgeDecodeError => ({
    kind: 'AgeDecodeError',
    message: errorMessage,
    detail: { age: raw },
  }),
} as const;

const Age = {
  ...codecFromPrism(prismInstance)(AgeDecodeError.new),
} as const;

export { Age, AgeDecodeError };
