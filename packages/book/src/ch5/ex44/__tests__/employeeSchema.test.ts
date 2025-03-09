import { employeeSchema } from 'ch5/ex44/employeeSchema.js';
import { assert } from 'vitest';

describe('safeParse', () => {
  it.each([
    {
      name: '',
      expected:
        'String must contain at least 1 character(s)',
    },
    {
      name: 'ABCDEFGHIJK', // 11 characters
      expected:
        'String must contain at most 10 character(s)',
    },
  ])(
    `name=$nameの場合、バリデーションエラー`,
    ({ name, expected }) => {
      const result = employeeSchema.safeParse({
        name,
        age: 30,
      });
      assert(!result.success);
      expect(result.error.format()).toStrictEqual({
        _errors: [],
        name: {
          _errors: expect.arrayContaining([expected]),
        },
      });
    },
  );
  it.each([
    {
      age: 10.4,
      expected: 'Expected integer, received float',
    },
    {
      age: 61,
      expected: 'Number must be less than or equal to 60',
    },
  ])(
    `age=$ageの場合、バリデーションエラー`,
    ({ age, expected }) => {
      const result = employeeSchema.safeParse({
        name: '木村',
        age,
      });
      assert(!result.success);
      expect(result.error.format()).toStrictEqual({
        _errors: [],
        age: {
          _errors: expect.arrayContaining([expected]),
        },
      });
    },
  );
});
