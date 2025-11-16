import { assert, expect } from 'vitest';

import { employeeSchema } from '../employeeSchema.js';

describe('safeParse', () => {
  it('名前と年齢のバリデーションエラー', () => {
    const result = employeeSchema.safeParse({
      name: 100_000_000_000,
      age: 104.5,
    });
    assert(!result.success);
    expect(result.error.issues).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: '名前は文字列で指定してください',
        }),
        expect.objectContaining({
          message: '年齢は整数で指定してください',
        }),
        expect.objectContaining({
          message: '年齢は60以下で指定してください',
        }),
      ]),
    );
  });

  it('必須項目のバリデーションエラー', () => {
    const result = employeeSchema.safeParse({});
    assert(!result.success);
    expect(result.error.issues).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: '名前は必須です',
        }),
        expect.objectContaining({
          message: '年齢は必須です',
        }),
      ]),
    );
  });
});
