import { z } from 'zod';
import type { Invariants, NominalValue, AnyNominal, NominalName } from '../../nominal';
import { Builder } from '../../nominal';
import type { NNominal } from '../../nominal/nominal';

export const buildZodEffects = <N extends AnyNominal>(
  name: NominalName<N>,
  zod: z.ZodType<NominalValue<N>>,
  invariants: Invariants<N>,
  builder: Builder<N> = Builder<N>(name),
): z.ZodEffects<
  z.ZodType<NominalValue<N>, z.ZodTypeDef, NominalValue<N>>,
  NNominal<N>,
  NominalValue<N>
> => {
  const zodEffects = zod.superRefine((val, ctx) => {
    invariants.units.forEach((unit) => {
      if (!unit.isValid(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: unit.issue,
        });
      }
    });
  });
  return zodEffects.transform(builder.build);
};
