import assert from 'node:assert';

type Telephone = string;

const PHONE_NUMBER_REGEX = /^0\d{1,4}-\d{1,4}-\d{4}$/;

const assertTelephone = (value: string): void => {
  assert(
    PHONE_NUMBER_REGEX.test(value),
    '電話番号の形式が正しくありません',
  );
};

const build = (value: string): Telephone => {
  assertTelephone(value);
  return value;
};

const Telephone = {
  build,
} as const;

export { Telephone };
