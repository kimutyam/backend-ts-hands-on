import assert from 'assert';
import { z } from 'zod';
import type { Nominal } from '../../../nominal';
import { ZodNominalParser } from '../zodNominalParser';

describe('zod公証型', () => {
  const name = 'DummyNominal';
  type DummyNominal = Nominal<typeof name, string>;
  const zod = z.string().min(2).describe(name);
  const parser = ZodNominalParser<DummyNominal>(name, zod);

  it('parse value error', () => {
    const result = parser.safeParse('');
    assert(!result.success);
    expect(result.error.errors).toHaveLength(1);
  });

  it('parse object error', () => {
    const foo = z.object({
      a: zod,
      b: zod,
    });
    const result = foo.safeParse({
      a: '1',
      b: 1,
    });
    assert(!result.success);
    expect(result.error.errors).toHaveLength(2);
  });
});
