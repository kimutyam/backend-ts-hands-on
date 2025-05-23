import { employeeSchema } from 'ch5/ex5201/employeeSchema.js';
import { assert, expect } from 'vitest';
import { z } from 'zod';

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
    expect(result.error.format()).toStrictEqual({
      _errors: expect.arrayContaining(['Expected object, received string']),
    });
  });

  it('エラー: ageが文字列', () => {
    const result = employeeSchema.safeParse({
      name: '木村',
      age: 'Priceless',
    });
    assert(!result.success);
    expect(result.error.format()).toStrictEqual({
      _errors: [],
      age: {
        _errors: expect.arrayContaining(['Expected number, received string']),
      },
    });
  });
});
