import { employeeSchema } from 'ch5/ex46/employeeSchema.js';
import { assert, expect } from 'vitest';

describe('safeParse', () => {
  it('名前と年齢のバリデーションエラー', () => {
    const result = employeeSchema.safeParse({
      name: 100_000_000_000,
      age: 104.5,
    });
    assert(!result.success);
    expect(result.error.format()).toStrictEqual({
      _errors: [],
      name: {
        _errors: expect.arrayContaining([
          '文字列で指定してください',
        ]),
      },
      age: {
        _errors: expect.arrayContaining([
          '整数で指定してください',
          '60以下で指定してください',
        ]),
      },
    });
  });

  it('必須項目のバリデーションエラー', () => {
    const result = employeeSchema.safeParse({});
    assert(!result.success);
    expect(result.error.format()).toStrictEqual({
      _errors: [],
      name: {
        _errors: expect.arrayContaining(['名前は必須です']),
      },
      age: {
        _errors: expect.arrayContaining(['年齢は必須です']),
      },
    });
  });
});
