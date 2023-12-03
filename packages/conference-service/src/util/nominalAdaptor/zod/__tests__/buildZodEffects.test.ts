import assert from 'node:assert';
import { z } from 'zod';
import type { Nominal } from '../../../nominal';
import { Invariants, InvariantUnit } from '../../../nominal';
import { buildZodEffects } from '../buildZodEffects';

const kindDummy = 'Dummy';
type Dummy = Nominal<typeof kindDummy, number>;
const buildInvariantUnit = InvariantUnit<Dummy>;
const invariants = Invariants.build(
  kindDummy,
  buildInvariantUnit((value) => value > 0, '0より大きい数値にしてください'),
  buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
);

it('不変条件からZodEffectを組み立て、バリデーション', () => {
  const zodType = z.object({
    a: buildZodEffects(kindDummy, z.number(), invariants),
    b: buildZodEffects(kindDummy, z.number().min(10, 'zod: 10以上を指定ください'), invariants),
  });
  const result = zodType.safeParse({ a: -1.1, b: -1 });

  assert(!result.success);

  const formattedError = result.error.format();

  expect(formattedError).toEqual(
    expect.objectContaining({
      _errors: [],
      a: expect.objectContaining({
        _errors: expect.arrayContaining(['0より大きい数値にしてください', '整数で指定ください']),
      }),
      b: expect.objectContaining({
        _errors: expect.arrayContaining([
          'zod: 10以上を指定ください',
          '0より大きい数値にしてください',
        ]),
      }),
    }),
  );
});
