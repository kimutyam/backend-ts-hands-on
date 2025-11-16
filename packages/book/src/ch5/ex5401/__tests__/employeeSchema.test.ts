import { assert } from 'vitest';

import { employeeSchema } from '../employeeSchema.js';

describe('safeParse', () => {
  // 1
  it.each([
    {
      name: '',
      expectedCode: 'too_small',
    },
    {
      name: 'ABCDEFGHIJK', // 11 characters
      expectedCode: 'too_big',
    },
  ])(`name=$nameの場合、バリデーションエラー`, ({ name, expectedCode }) => {
    const result = employeeSchema.safeParse({
      name,
      age: 30,
    });
    assert(!result.success);
    expect(result.error.issues).toStrictEqual([
      expect.objectContaining({
        code: expectedCode,
        path: ['name'],
      }),
    ]);
  });

  // 2
  it.each([
    {
      age: 10.4,
      expectedCode: 'invalid_type',
    },
    {
      age: 61,
      expectedCode: 'too_big',
    },
  ])(`age=$ageの場合、バリデーションエラー`, ({ age, expectedCode }) => {
    const result = employeeSchema.safeParse({
      name: '木村',
      age,
    });
    assert(!result.success);
    expect(result.error.issues).toStrictEqual([
      expect.objectContaining({
        code: expectedCode,
        path: ['age'],
      }),
    ]);
  });
});
