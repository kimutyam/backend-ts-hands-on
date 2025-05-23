import type { z, ZodType } from 'zod';
import type { AnyNominal, Invariants, NominalName, NominalValue } from '../../nominal';
import { Builder } from '../../nominal';
import type { NNominal } from '../../nominal/nominal';

export type ZodNominalParser<N extends AnyNominal> = Pick<
  z.ZodEffects<z.ZodTypeAny, NNominal<N>, NominalValue<N>>,
  'safeParse'
>;

export const ZodNominalParser = <N extends AnyNominal>(
  name: NominalName<N>,
  zod: ZodType<NominalValue<N>>,
  invariants?: Invariants<N>,
): ZodNominalParser<N> => {
  const builder = Builder<N>(name, invariants);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { safeParse } = zod.transform(builder.build);
  return { safeParse };
};
