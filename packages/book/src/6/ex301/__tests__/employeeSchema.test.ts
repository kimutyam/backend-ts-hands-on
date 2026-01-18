import assert from 'node:assert';

import { z } from 'zod';

import { employeeSchema } from '../../ex201/employeeSchema.js';

describe('parse', () => {
  it('成功', () => {
    const product = employeeSchema.parse({
      name: '木村',
      age: 30,
    });
    expect(product).toStrictEqual({
      name: '木村',
      age: 30,
    });
  });

  it('エラー: ageが文字列', () => {
    expect(() =>
      employeeSchema.parse({
        name: '木村',
        age: 'Secret',
      }),
    ).toThrow(z.ZodError);
  });
});

describe('safeParse', () => {
  it('成功', () => {
    const result = employeeSchema.safeParse({
      name: '木村',
      age: 30,
    });
    // 1
    assert(result.success);
    expect(result.data).toStrictEqual({
      name: '木村',
      age: 30,
    });
  });

  it('エラー: オブジェクトではない', () => {
    const result = employeeSchema.safeParse('not an object');
    assert(!result.success);
    // 2
    expect(result.error.issues).toStrictEqual([
      expect.objectContaining({
        code: 'invalid_type',
        path: [],
      }),
    ]);
  });

  it('エラー: ageが文字列', () => {
    const result = employeeSchema.safeParse({
      name: '木村',
      age: 'Priceless',
    });
    assert(!result.success);
    expect(result.error.issues).toStrictEqual([
      expect.objectContaining({
        code: 'invalid_type',
        path: ['age'],
      }),
    ]);
  });
});
