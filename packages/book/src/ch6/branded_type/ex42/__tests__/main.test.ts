import assert from 'node:assert';
import { z } from 'zod';

describe('zod組み込みのRefinements', () => {
  const schema = z.number().min(1).max(10, '10以上である必要があります').int('整数ではないです');

  it('parse関数: 文字列の場合は例外がthrowされる', () => {
    expect(() => schema.parse('Invalid')).toThrow(z.ZodError);
  });

  it('safeParse関数: 文字列の場合はパースエラー', () => {
    const result = schema.safeParse('Invalid');
    assert(!result.success);
    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: expect.arrayContaining(['Expected number, received string']),
      }),
    );
  });

  it('safeParse関数: 1未満の整数はパースエラー', () => {
    const result = schema.safeParse(0);

    assert(!result.success);

    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: expect.arrayContaining(['Number must be greater than or equal to 1']),
      }),
    );
  });

  it('safeParse関数: 負の小数はパースエラー', () => {
    const result = schema.safeParse(11.1);

    assert(!result.success);

    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: expect.arrayContaining(['10以上である必要があります', '整数ではないです']),
      }),
    );
  });

  it('safeParse関数: 1以上10以下の整数の場合はパース成功', () => {
    const result = schema.safeParse(3);
    assert(result.success);
    expect(result.data).toBe(3);
  });
});

describe('ユーザー定義のRefinements', () => {
  const sortedStringSchema = z
    .string()
    .min(3)
    .max(10, '10文字以内で指定ください')
    .refine(
      (arg) => [...arg].sort().join('') === arg,
      (arg) => ({
        message: `ソートされていません: ${arg}`,
      }),
    );

  it('Refinementsを満たす条件の場合は成功', () => {
    const result = sortedStringSchema.safeParse('ABCD');
    assert(result.success);
    expect(result.data).toBe('ABCD');
  });

  it('3文字を満たない場合はエラー', () => {
    const result = sortedStringSchema.safeParse('A');
    assert(!result.success);
    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        // zodのデフォルトのエラーメッセージ
        _errors: expect.arrayContaining(['String must contain at least 3 character(s)']),
      }),
    );
  });

  it('複数のエラー: 10文字超過 & ソートされていない', () => {
    const result = sortedStringSchema.safeParse('DAUQQDRFSEGAE');
    assert(!result.success);
    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        // ユーザー定義したエラーメッセージ
        _errors: expect.arrayContaining([
          '10文字以内で指定ください',
          'ソートされていません: DAUQQDRFSEGAE',
        ]),
      }),
    );
  });
});
